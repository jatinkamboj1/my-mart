const { PrismaClient } = require('@prisma/client');
const { parseDecimal } = require('./healper');
const prisma = new PrismaClient();

// Image URL to be used for products
const imageUrl = 'https://hosting.photorobot.com/images/4748478675156992/-N2LSyH46ADddS9aUmBF/FINAL/Bus6l8dovGiK8mYIIxs7Cg?fm=webp&w=1368&h=200&q=85';

// Utility function to generate a slug from product name
const generateSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

async function createProducts() {
  try {
    // Fetch categories (including subcategories) to assign to products
    const categories = await prisma.category.findMany();

    // Hardware-related product types
    const productTypes = ['Drill', 'Saw', 'Hammer', 'Screwdriver', 'Wrench'];

    // Hardware-related brands
    const brands = ['DeWalt', 'Bosch', 'Makita', 'Stanley', 'Craftsman'];

    // Loop through each category and create products
    for (const category of categories) {
      const categoryName = category.categoryName;

      // Create two products for each category
      for (let i = 0; i < 2; i++) { // Adjust the number of products per category as needed
        const productName = `${categoryName} Product ${i + 1}`;
        const productSlug = generateSlug(productName);

        // Create Product
        const product = await prisma.product.create({
          data: {
            name: productName,
            sku: `SKU-${i + 1}-${categoryName}`,
            price: parseDecimal((Math.random() * (2000 - 50) + 50)),
            discountedPrice: parseDecimal((Math.random() * (2000 - 50) + 50)),
            quantity: Math.floor(Math.random() * 100 + 10), // Random quantity between 10 and 100
            salableQuantity: Math.floor(Math.random() * 100 + 10),
            description: `This is a product of type ${categoryName}.`,
            shortDescription: `Short description for ${productName}.`,
            brandName: brands[i % brands.length], // Random hardware brand
            type: productTypes[i % productTypes.length], // Random hardware product type
            length: `${Math.floor(Math.random() * 20 + 10)}cm`, // Random length between 10cm and 30cm
            loadingCapacity: `${Math.floor(Math.random() * 10 + 1)}kg`, // Random capacity between 1kg and 10kg
            mechanism: "Electric", // Mechanism for hardware products
            synchronisation: "Manual", // Synchronisation type for hardware products
            brackets: "Not Included", // Bracket type
            cataloguePage: `Page ${i + 1}`,
            quantityInBox: "1",
            boardThickness: "Not Applicable",
            visible_on: "ALL",
            slug: productSlug,
            // Add image to the product
            images: {
              create: [
                {
                  url: imageUrl,
                  type: "CARD", // Type can be CARD, BANNER, MOBILE, OTHER
                  description: `Image for ${productName}`,
                  order: 1,
                },
              ],
            },
            Category: {
              connect: { id: category.id }, // Connect product to the category
            },
          },
        });

        // Example of assigning tags (using the "ShopByCategory" tag)
        const tag = await prisma.tag.findFirst({
          where: {
            name: "ShopByCategory",
          },
        });

        if (tag) {
          await prisma.product.update({
            where: { id: product.id },
            data: {
              Tag: {
                connect: { id: tag.id },
              },
            },
          });
        }
      }
    }
  } catch (error) {
    console.error('Error creating products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createProducts();
