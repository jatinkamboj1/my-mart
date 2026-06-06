// Routes: Authentication, Category, and Product Operations

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const Ajv = require("ajv");
// const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const router = express.Router();

const prisma = new PrismaClient();
const ajv = new Ajv();
const addFormats = require("ajv-formats");
const { sendEmailOTP } = require("../utils/mail/sender");
addFormats(ajv);

// AWS.config.update({
//   region: process.env.AWS_REGION,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });
// const sns = new AWS.SNS();


// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
  );
};

// Send OTP via AWS SNS
const sendOtp = async (phone, otp) => {
  const params = {
    Message: `Your SAAB Store OTP is ${otp}`,
    PhoneNumber: phone,
  };
  await sns.publish(params).promise();
  return otp;
};


// Validation Schemas
const phoneAuthSchema = {
  type: "object",
  properties: {
    phone: { type: "string" },
  },
  required: ["phone"],
};

const verifyOtpSchema = {
  type: "object",
  properties: {
    phone: { type: "string" },
    email: { type: "string", format: "email" },
    otp: { type: "string", minLength: 6, maxLength: 6 },
  },
  allOf: [
    {
      anyOf: [
        { required: ["phone"] },
        { required: ["email"] },
      ],
    },
    { required: ["otp"] },
  ],
};

const registerSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1 },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
  },
  required: ["name", "email", "password"],
};

const reOTPSchema = {
  type: "object",
  properties: {
    phone: { type: "string" },
    email: { type: "string", format: "email" },
  },
  anyOf: [
    { required: ["phone"] },
    { required: ["email"] },
  ],
};

const loginSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
  },
  required: ["email", "password"],
};

const validate = (schema) => (req, res, next) => {
  const validate = ajv.compile(schema);
  const valid = validate(req.body);
  if (!valid) return res.status(400).json({ errors: validate.errors });
  next();
};

// Login or Register with Phone Number
router.post("/phone", validate(phoneAuthSchema), async (req, res) => {
  const { phone } = req.body;

  try {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Upsert the user: if the user exists, update; otherwise, create a new one
    const user = await prisma.user.upsert({
      where: { phone },
      update: {
        otp,
        otpExpiry: new Date(Date.now() + 5 * 60 * 1000), // OTP expires in 5 minutes
      },
      create: {
        phone,
        otp,
        otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
        name: "NEW USER",
        role: "USER", // Default role for new users
      },
    });

    // Send OTP to the user's phone (replace this with the actual OTP sending logic)
    await sendOtp(phone, otp);

    res.status(200).json({ message: "OTP sent successfully", userId: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.post("/verify-otp", validate(verifyOtpSchema), async (req, res) => {
//   const { phone, otp } = req.body;
//   try {
//     const user = await prisma.user.findUnique({ where: { phone } });

//     if (!user || user.otp !== otp || new Date() > new Date(user.otpExpiry)) {
//       return res.status(400).json({ error: "Invalid or expired OTP" });
//     }

//     await prisma.user.update({
//       where: { phone },
//       data: { otp: null, otpExpiry: null, confirmedPhone: true },
//     });

//     const token = generateToken(user);
//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Register with Email and Password

router.post("/register", validate(registerSchema), async (req, res) => {
  const { name, email, password, phone, status } = req.body;

  try {
    // 1. Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      });
    }

    // 2. Check if email OR phone already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists with same email or phone number",
      });
    }

    // 3. Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Transaction starts here
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          name,
          email,
          phone,
          password: hashedPassword,
          otp: status === "VERIFIED" ? null : otp,
          status: status || "UNVERIFIED",
          otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
        },
      });

      // Send OTP (inside transaction logic)
      if (!status || status === "UNVERIFIED") {
        const emailSent = await sendEmailOTP(email, otp);

        // If your function doesn't return boolean, wrap it in try/catch
        if (!emailSent) {
          throw new Error("OTP email failed");
        }
      }

      return user;
    });

    // 6. Success response
    return res.status(200).json({
      message: "User registered successfully. OTP sent.",
      userId: result.id,
      email: result.email,
      phone: result.phone,
    });

  } catch (error) {
    console.log("error:", error);

    if (error.code === "P2002") {
      return res.status(400).json({
        error: "Email or phone already exists",
      });
    }

    return res.status(500).json({
      error: "Registration failed. Please try again.",
    });
  }
});

router.post("/resend-otp", validate(reOTPSchema), async (req, res) => {
  const { email,phone } = req.body;
  try {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    const isUser = await prisma.user.findUnique({ 
      where: { email }
    });

    if (isUser) {
      if (isUser.status === "VERIFIED") {
        return res.status(400).json({ error: "User is verified" });
      }
      try {
        await prisma.user.update({
          where: { phone, email },
          data: { 
            otp,
            otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
           },
        });
        await sendEmailOTP(email, otp);
        return res.status(200).json({ message: "OTP sent successfully", userId: isUser.id, email });
      } catch (error) {
        console.log('error', error);
        
        return res.status(400).json({ error: "User's email is incorrect!" });
      }
    }
    return res.status(400).json({ error: "User's email is incorrect!" });
  } catch (error) {
    console.log('error: ', error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/verify-otp", validate(verifyOtpSchema), async (req, res) => {
  const { phone, otp, email } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { phone ,email},
    });

    if (!user || user.otp !== otp || new Date() > new Date(user.otpExpiry)) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    await prisma.user.update({
      where: { phone, email },
      data: { otp: null, otpExpiry: null, status: "VERIFIED", confirmedPhone: true },
    });

    res.status(200).json({ message: "User Verified" });
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ error: error.message });
  }
});

// Login with Email and Password
router.post("/login", validate(loginSchema), async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ 
      where: { email }
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user);
    res.status(200).json({ user: {id: user.id, email: user.email, name: user.name, role: user.role}, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


/**
 * GET /api/auth/verify
 * Header: Authorization: Bearer <token>
 */
router.get("/verify", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        valid: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Prefer userId in token (recommended)
    const dbUser = await prisma.user.findUnique({
      where: {
        id: decoded.userId || undefined,
        email: decoded.email || undefined,
      },
    });

    if (!dbUser) {
      return res.status(403).json({
        valid: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      valid: true,
      user: {
        id: dbUser.id,
        email: dbUser.email,
        phone: dbUser.phone,
        role: dbUser.role,
      },
    });
  } catch (error) {
    return res.status(403).json({
      valid: false,
      message: "Invalid or expired token",
    });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email, name } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    if (name && user.name !== name) {
      return res.status(400).json({
        error: "Name does not match",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await prisma.user.update({
      where: { email },
      data: {
        otp,
        otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    await sendEmailOTP(email, otp);

    return res.status(200).json({
      message: "OTP sent successfully",
      email,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Failed to send OTP",
    });
  }
});

router.post("/verify-forgot-password-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (
      !user ||
      user.otp !== otp ||
      new Date() > new Date(user.otpExpiry)
    ) {
      return res.status(400).json({
        error: "Invalid or expired OTP",
      });
    }

    const resetToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        type: "PASSWORD_RESET",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    await prisma.user.update({
      where: { email },
      data: {
        otp: null,
        otpExpiry: null,
      },
    });

    return res.status(200).json({
      message: "OTP verified",
      resetToken,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "OTP verification failed",
    });
  }
});

router.post("/reset-password", async (req, res) => {
  const { resetToken, password } = req.body;

  try {
    const decoded = jwt.verify(
      resetToken,
      process.env.JWT_SECRET
    );

    if (decoded.type !== "PASSWORD_RESET") {
      return res.status(400).json({
        error: "Invalid reset token",
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Password must contain uppercase, lowercase, number and special character",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    await prisma.user.update({
      where: {
        id: decoded.userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    return res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      error: "Invalid or expired reset token",
    });
  }
});

module.exports = router;
