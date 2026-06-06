const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const createAdmin = async () => {
  try {
    // Admin Credentials
    const adminData = {
      name: "Admin",
      email: "admin@gmail.com",
      phone: "9876543210",
      password: "Admin@123",
    };

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existingAdmin) {
      console.log("Admin already exists!");
      return;
    }

    // Password Hash
    const hashedPassword = await bcrypt.hash(
      adminData.password,
      10
    );

    // Create Admin in DB
    const admin = await prisma.user.create({
      data: {
        name: adminData.name,
        email: adminData.email,
        phone: adminData.phone,
        password: hashedPassword,
        role: "ADMIN",
        confirmedEmail: true,
        confirmedPhone: true,
        status: "VERIFIED",
      },
    });

    console.log("Admin Created Successfully");
    console.log(admin);

  } catch (error) {
    console.log("Error creating admin:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createAdmin();