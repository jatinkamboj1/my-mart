const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Utility function to generate a slug from category name
const generateSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

async function createCategories() {
  const parentCategories = [
    'Tools',
    'Paint & Painting Supplies',
    'Plumbing',
    'Electrical',
    'Lawn & Garden',
    'Home Improvement',
    'Building Materials',
    'Safety & Security'
  ];

  const tags = ['ShopByCategory', 'ShopByBrand', 'ShopByType'];

  const subcategoryNames = {
    'Tools': [
      'Hand Tools', 'Power Tools', 'Tool Storage', 'Workbenches', 'Tool Sets'
    ],
    'Paint & Painting Supplies': [
      'Paint Brushes', 'Spray Paint', 'Primer', 'Paint Rollers', 'Paint Sprayers'
    ],
    'Plumbing': [
      'Pipes & Fittings', 'Faucets', 'Water Heaters', 'Plumbing Tools', 'Pipe Insulation'
    ],
    'Electrical': [
      'Wiring & Cables', 'Light Bulbs', 'Circuit Breakers', 'Power Strips', 'Electrical Tools'
    ],
    'Lawn & Garden': [
      'Garden Tools', 'Planters & Pots', 'Lawn Care', 'Outdoor Furniture', 'Fertilizers'
    ],
    'Home Improvement': [
      'Flooring', 'Home Décor', 'Cabinet Hardware', 'Door Hardware', 'Lighting Fixtures'
    ],
    'Building Materials': [
      'Lumber & Plywood', 'Cement & Concrete', 'Insulation', 'Drywall & Plaster', 'Roofing Materials'
    ],
    'Safety & Security': [
      'Safety Gear', 'Fire Extinguishers', 'Security Cameras', 'Locks & Padlocks', 'First Aid Kits'
    ]
  };

  try {
    // Loop through each parent category
    for (const parentCategoryName of parentCategories) {
      const slug = generateSlug(parentCategoryName);

      // Create a parent category
      const parentCategory = await prisma.category.create({
        data: {
          categoryName: parentCategoryName,
          slug: slug,
          isParent: true
        }
      });

      // Create subcategories for the parent category
      for (let i = 0; i < subcategoryNames[parentCategoryName].length; i++) {
        const subcategoryName = subcategoryNames[parentCategoryName][i];
        const subcategorySlug = generateSlug(subcategoryName);

        // Check if slug already exists, and adjust if necessary
        let finalSlug = subcategorySlug;
        let slugExists = await prisma.category.findUnique({
          where: { slug: finalSlug }
        });

        // If the slug exists, append a unique identifier (e.g., number)
        let count = 1;
        while (slugExists) {
          finalSlug = `${subcategorySlug}-${count}`;
          slugExists = await prisma.category.findUnique({
            where: { slug: finalSlug }
          });
          count++;
        }

        // Create the subcategory
        const subcategory = await prisma.category.create({
          data: {
            categoryName: subcategoryName,
            slug: finalSlug,
            parentId: parentCategory.id,
            isParent: false
          }
        });

        // Assign tags to subcategories
        const tagIndex = i % tags.length; // Round-robin distribution of tags
        const tagName = tags[tagIndex];

        const tag = await prisma.tag.upsert({
          where: {
            name_isCategory: {
              name: tagName,
              isCategory: true
            }
          },
          update: {},
          create: {
            name: tagName,
            isCategory: true
          }
        });

        // Assign the tag to the subcategory (through Category-Tag relation)
        await prisma.category.update({
          where: { id: subcategory.id },
          data: {
            Tag: {
              connect: { id: tag.id }  // This connects the Tag to the Category
            }
          }
        });

      }
    }
  } catch (error) {
    console.error('Error creating categories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createCategories();
