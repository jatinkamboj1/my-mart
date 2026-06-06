const AWS = require('aws-sdk');
const { Buffer } = require('buffer');
const multer = require('multer');

const fs = require('fs');
const path = require('path');

// Set up local upload folder
const uploadFolder = path.join(__dirname, '../uploads');

// Ensure folder exists
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const upload = multer({ storage: multer.memoryStorage() });

const uploadToS3 = async (base64String, folder) => {
  try {
    // Extract metadata from Base64 string
    const matches = base64String.match(/^data:(.*?);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid Base64 string');
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // Generate a unique file name
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${mimeType.split('/')[1]}`;

    // S3 upload parameters
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: mimeType,
    };

    // Upload to S3
    const data = await s3.upload(params).promise();
    return data.Location; // Return the file URL
  } catch (error) {
    throw new Error(`Failed to upload to S3: ${error.message}`);
  }
};

// Function to save base64 string as a file locally
const uploadToLocal = async (base64String, folder = '') => {
  try {
    // Extract metadata from Base64 string
    const matches = base64String.match(/^data:(.*?);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid Base64 string');
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // Generate a unique file name
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${mimeType.split('/')[1]}`;

    // Folder path
    const folderPath = path.join(uploadFolder, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const filePath = path.join(folderPath, fileName);

    // Write file locally
    await fs.promises.writeFile(filePath, buffer);

    // Return local URL (adjust according to your server setup)
    return `/uploads/${folder ? folder + '/' : ''}${fileName}`;
  } catch (error) {
    throw new Error(`Failed to upload locally: ${error.message}`);
  }
};

module.exports = { uploadToLocal, uploadToS3, upload };
