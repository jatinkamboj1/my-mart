const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    const adminUser = await prisma.user.findFirst({
      where: { email: "admin@example.com" },
    });

    if (!adminUser) {
      const defaultAdminPassword =
        process.env.DEFAULT_ADMIN_PASSWORD || "admin123";

      const hashedPassword = await bcrypt.hash(defaultAdminPassword, 10);

      await prisma.user.create({
        data: {
          name: "Admin User",
          email: "admin@example.com",
          phone: "1234567890",
          password: hashedPassword,
          role: "ADMIN",
          confirmedEmail: true,
        },
      });

      console.log("✅ Admin user created successfully");
    } else {
      console.log("ℹ️ Admin user already exists");
    }
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
  }
}

async function createSiteSetting() {
  // 1. Seed settings
  const settings = [
    {
      key: "announcement.text",
      value:
        "Free Delivery Available! - Orders over £60 including VAT - Excludes Highlands, Islands, NI and Europe",
      description: "Announcement bar text",
    },
    {
      key: "search.heading",
      value: `<span class="promo-unit__text">Here to help! Mon - Fri 9am - 5pm:
        <a class="promo-unit__link" href="tel:+443300432122"> 330 043 2122</a>
      </span>`,
      description: "Heading shown on search page",
    },
    {
      key: "welcome.message",
      value: `<div>
        <h2>Welcome to MyMarts</h2>
        <p>At MyMarts, we offer a wide range of <strong>storage solutions and everyday essentials</strong> designed to simplify your home, office, and business needs.</p>
      </div>`,
      description: "Homepage welcome message",
    },
  ];

  await Promise.all(
    settings.map((setting) =>
      prisma.siteSetting.upsert({
        where: { key: setting.key },
        update: {
          value: setting.value,
          description: setting.description,
        },
        create: setting,
      })
    )
  );

  console.log("✅ Settings seeded");

}

async function main() {
  // 1. Seed admin user
  await createAdminUser();

  // 2. Seed site setting
  await createSiteSetting();
}

main()
  .catch((e) => {
    console.error("❌ Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });