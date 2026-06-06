export function convertS3UrlToLocalPath(url) {
  const s3BaseUrl = 'https://ecommerce-jewellery-store.s3.eu-west-1.amazonaws.com/';
  const localBasePath = `${process.env.UPLOAD_URL}/uploads/`;

  let localPath = url;
  if (url.startsWith(s3BaseUrl)) {
    localPath = url.replace(s3BaseUrl, localBasePath);
  }
  if (url.startsWith("/uploads/")) {
    localPath = url.replace("/uploads/", localBasePath);
  }
  return localPath;
}