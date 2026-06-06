CREATE EXTENSION IF NOT EXISTS "pgcrypto";

BEGIN;

-- =====================================================
-- ROOT CATEGORIES
-- =====================================================

INSERT INTO "Category"
(
    id,
    "categoryName",
    "metaTitle",
    description,
    "metaDescription",
    slug,
    keywords,
    tags,
    url,
    "visible_on",
    "isParent",
    "menuType",
    "order",
    "isHighlighted",
    "createdAt",
    "updatedAt"
)
VALUES

(
    gen_random_uuid(),
    'Grocery',
    'Grocery Essentials | Household, Kitchen & Baking Products',
    'Everyday grocery essentials including household products, kitchen storage items, and baking supplies for home and family use.',
    'Shop grocery essentials including household cleaning products, kitchen wraps, bakeware, and everyday home necessities.',
    'grocery',
    'grocery essentials, household products, kitchen supplies, baking essentials, home care products',
    ARRAY['grocery','household','kitchen'],
    '/grocery',
    'header',
    true,
    'mega',
    1,
    true,
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Home & Kitchen',
    'Home & Kitchen | Storage, Organisation & Kitchen Essentials',
    'Home and kitchen essentials including storage solutions, cookware accessories, kitchen organisation, and laundry care products.',
    'Shop home and kitchen essentials including storage organisers, cookware accessories, laundry products, and kitchen solutions.',
    'home-kitchen',
    'home and kitchen, storage solutions, kitchen organisation, cookware accessories, laundry accessories',
    ARRAY['home','kitchen','storage'],
    '/home-kitchen',
    'header',
    true,
    'mega',
    2,
    true,
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'DIY & Tools',
    'DIY & Tools | Home Improvement & Repair Essentials',
    'DIY and home improvement essentials including decorating supplies, adhesives, repair products, and tools for everyday projects.',
    'Shop DIY and tools products including decorating supplies, adhesives, fillers, and home repair essentials.',
    'diy-tools',
    'diy tools, home improvement, decorating supplies, adhesives, repair products',
    ARRAY['diy','tools','repair'],
    '/diy-tools',
    'header',
    true,
    'mega',
    3,
    false,
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Gardening',
    'Gardening Essentials | Pots, Planters & Garden Accessories',
    'Gardening essentials including plant pots, planters, accessories, and products for indoor and outdoor gardening projects.',
    'Shop gardening essentials including plant pots, hanging baskets, planters, and gardening accessories.',
    'gardening',
    'gardening, plant pots, planters, garden accessories, indoor plants, outdoor gardening',
    ARRAY['gardening','plants'],
    '/gardening',
    'header',
    true,
    'mega',
    4,
    false,
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Pet Supplies',
    'Pet Supplies | Pet Care & Health Essentials',
    'Pet care essentials including flea treatments, grooming products, pest control, and health products for pets.',
    'Shop pet supplies including flea treatments, grooming accessories, pest control, and pet care essentials.',
    'pet-supplies',
    'pet supplies, pet care, flea treatment, pet grooming, pet health',
    ARRAY['pets','pet care'],
    '/pet-supplies',
    'header',
    true,
    'mega',
    5,
    false,
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Stationery & Office Supplies',
    'Stationery & Office Supplies | Office & School Essentials',
    'Office and stationery essentials including paper products, adhesive supplies, notebooks, labels, and office organisation products.',
    'Shop stationery and office supplies including paper products, adhesives, labels, and office essentials.',
    'stationery-office-supplies',
    'stationery supplies, office supplies, paper products, office organisation, adhesive supplies',
    ARRAY['stationery','office','paper'],
    '/stationery-office-supplies',
    'header',
    true,
    'mega',
    6,
    false,
    NOW(),
    NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- LEVEL 2 CATEGORIES
-- =====================================================

INSERT INTO "Category"
(
    id,
    "categoryName",
    "metaTitle",
    description,
    "metaDescription",
    slug,
    keywords,
    tags,
    url,
    "visible_on",
    "isParent",
    "menuType",
    "order",
    "parentId",
    "createdAt",
    "updatedAt"
)
VALUES

-- Grocery
(
    gen_random_uuid(),
    'Home Care & Cleaning',
    'Home Care & Cleaning | Household Cleaning Essentials',
    'Household home care and cleaning essentials including surface cleaners, disinfectants, kitchen cleaners, and everyday cleaning supplies.',
    'Explore home care and cleaning products including disinfectants, sprays, washing-up liquids, and household cleaners.',
    'home-care-cleaning',
    'home care, household cleaning, disinfectants, kitchen cleaner, bathroom cleaner, cleaning supplies',
    ARRAY['cleaning','home care'],
    '/grocery/home-care-cleaning',
    'mega-menu',
    true,
    'simple',
    1,
    (SELECT id FROM "Category" WHERE slug = 'grocery'),
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Kitchen Wraps & Food Bags',
    'Kitchen Wraps & Food Bags | Food Storage Essentials',
    'Kitchen food storage essentials including cling film, foil, freezer bags, sandwich bags, and food storage solutions.',
    'Discover kitchen wraps and food bags including cling film, aluminium foil, freezer bags, and food storage products.',
    'kitchen-wraps-food-bags',
    'kitchen wraps, food bags, cling film, aluminium foil, freezer bags, sandwich bags',
    ARRAY['food storage','kitchen wraps'],
    '/grocery/kitchen-wraps-food-bags',
    'mega-menu',
    true,
    'simple',
    2,
    (SELECT id FROM "Category" WHERE slug = 'grocery'),
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Bakeware',
    'Bakeware | Baking Tins, Trays & Accessories',
    'Bakeware and baking essentials including cake tins, baking trays, cupcake accessories, and home baking supplies.',
    'Browse bakeware essentials including baking trays, cake tins, cupcake cases, and baking accessories for home baking.',
    'bakeware',
    'bakeware, baking trays, cake tins, cupcake cases, baking accessories, baking supplies',
    ARRAY['baking','bakeware'],
    '/grocery/bakeware',
    'mega-menu',
    true,
    'simple',
    3,
    (SELECT id FROM "Category" WHERE slug = 'grocery'),
    NOW(),
    NOW()
),

-- Home & Kitchen
(
    gen_random_uuid(),
    'Storage & Organisation',
    'Storage & Organisation | Home Storage Solutions',
    'Home storage and organisation solutions including storage boxes, baskets, shelving accessories, and organisers for every room.',
    'Organise your home with storage boxes, baskets, shelving accessories, and practical organisation solutions.',
    'storage-organisation',
    'storage organisation, storage boxes, home storage, drawer organisers, storage baskets',
    ARRAY['storage','organisation'],
    '/home-kitchen/storage-organisation',
    'mega-menu',
    true,
    'simple',
    1,
    (SELECT id FROM "Category" WHERE slug = 'home-kitchen'),
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Kitchen Organisation',
    'Kitchen Organisation | Pantry & Storage Solutions',
    'Kitchen organisation products including cupboard organisers, spice racks, utensil storage, and pantry organisation solutions.',
    'Keep your kitchen organised with pantry storage, spice racks, cupboard organisers, and kitchen storage accessories.',
    'kitchen-organisation',
    'kitchen organisation, pantry storage, cupboard organisers, spice racks, kitchen storage',
    ARRAY['kitchen','organisation'],
    '/home-kitchen/kitchen-organisation',
    'mega-menu',
    true,
    'simple',
    2,
    (SELECT id FROM "Category" WHERE slug = 'home-kitchen'),
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Laundry Accessories',
    'Laundry Accessories | Laundry Care & Ironing Essentials',
    'Laundry care accessories including clothes pegs, washing bags, ironing accessories, and garment care essentials.',
    'Find laundry accessories including clothes pegs, ironing board covers, washing bags, and garment care products.',
    'laundry-accessories',
    'laundry accessories, garment care, clothes pegs, ironing accessories, laundry care',
    ARRAY['laundry','ironing'],
    '/home-kitchen/laundry-accessories',
    'mega-menu',
    true,
    'simple',
    3,
    (SELECT id FROM "Category" WHERE slug = 'home-kitchen'),
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Cookware Accessories',
    'Cookware Accessories | Kitchen Cooking Essentials',
    'Kitchen cookware accessories including pan protectors, splatter guards, lids, and cooking preparation tools.',
    'Explore cookware accessories including pan protectors, pot stands, splatter guards, and kitchen cooking tools.',
    'cookware-accessories',
    'cookware accessories, kitchen tools, pan protectors, cooking accessories, splatter guards',
    ARRAY['cookware','kitchen tools'],
    '/home-kitchen/cookware-accessories',
    'mega-menu',
    true,
    'simple',
    4,
    (SELECT id FROM "Category" WHERE slug = 'home-kitchen'),
    NOW(),
    NOW()
),

-- DIY
(
    gen_random_uuid(),
    'Decorating',
    'Decorating Supplies | Painting & Home Decorating Tools',
    'Decorating essentials including paint brushes, rollers, trays, masking tape, and painting preparation supplies.',
    'Browse decorating supplies including paint rollers, brushes, masking tape, trays, and preparation tools.',
    'decorating',
    'decorating supplies, painting tools, paint rollers, paint brushes, masking tape',
    ARRAY['decorating','painting'],
    '/diy-tools/decorating',
    'mega-menu',
    true,
    'simple',
    1,
    (SELECT id FROM "Category" WHERE slug = 'diy-tools'),
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Adhesives & Sealers',
    'Adhesives & Sealers | DIY Glues & Repair Products',
    'Adhesives and sealers for DIY, repairs, and decorating including tapes, glues, fillers, and silicone sealants.',
    'Explore adhesives and sealers including super glue, mounting tape, silicone sealants, and repair fillers.',
    'adhesives-sealers',
    'adhesives, sealers, super glue, silicone sealant, repair filler, mounting tape',
    ARRAY['adhesives','sealants'],
    '/diy-tools/adhesives-sealers',
    'mega-menu',
    true,
    'simple',
    2,
    (SELECT id FROM "Category" WHERE slug = 'diy-tools'),
    NOW(),
    NOW()
),

-- Gardening
(
    gen_random_uuid(),
    'Plant Pots & Planters',
    'Plant Pots & Planters | Indoor & Outdoor Gardening',
    'Plant pots and planter essentials including hanging baskets, saucers, seed trays, and indoor and outdoor planters.',
    'Browse plant pots, hanging baskets, seed trays, and planter accessories for indoor and outdoor gardening.',
    'plant-pots-planters',
    'plant pots, planters, hanging baskets, seed trays, gardening accessories',
    ARRAY['plants','planters'],
    '/gardening/plant-pots-planters',
    'mega-menu',
    true,
    'simple',
    1,
    (SELECT id FROM "Category" WHERE slug = 'gardening'),
    NOW(),
    NOW()
),

-- Pets
(
    gen_random_uuid(),
    'Flea & Tick Control',
    'Flea & Tick Control | Pet Pest Prevention Products',
    'Flea and tick control products for pets including sprays, shampoos, treatments, and pest prevention essentials.',
    'Discover flea and tick control products including pet sprays, shampoos, combs, and prevention treatments.',
    'flea-tick-control',
    'flea control, tick treatment, pet pest control, flea shampoo, flea prevention',
    ARRAY['pets','flea control'],
    '/pet-supplies/flea-tick-control',
    'mega-menu',
    true,
    'simple',
    1,
    (SELECT id FROM "Category" WHERE slug = 'pet-supplies'),
    NOW(),
    NOW()
),

-- Stationery
(
    gen_random_uuid(),
    'Tape & Adhesives',
    'Tape & Adhesives | Office Adhesive Essentials',
    'Office adhesive products including sticky tape, double-sided tape, glue sticks, and fastening essentials.',
    'Browse office tape and adhesive supplies including sticky tape, glue sticks, and fastening products.',
    'tape-adhesives',
    'office tape, adhesives, glue sticks, sticky tape, fastening supplies',
    ARRAY['office','adhesives'],
    '/stationery-office-supplies/tape-adhesives',
    'mega-menu',
    true,
    'simple',
    1,
    (SELECT id FROM "Category" WHERE slug = 'stationery-office-supplies'),
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Paper Products',
    'Paper Products | Office & School Paper Essentials',
    'Office paper essentials including printer paper, notebooks, labels, envelopes, sticky notes, and writing pads.',
    'Explore office paper products including notebooks, printer paper, labels, envelopes, and sticky notes.',
    'paper-products-category',
    'paper products, office paper, notebooks, printer paper, labels, envelopes',
    ARRAY['paper','office supplies'],
    '/stationery-office-supplies/paper-products-category',
    'mega-menu',
    true,
    'simple',
    2,
    (SELECT id FROM "Category" WHERE slug = 'stationery-office-supplies'),
    NOW(),
    NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- LEVEL 3 CATEGORIES
-- =====================================================

INSERT INTO "Category"
(
    id,
    "categoryName",
    "metaTitle",
    description,
    "metaDescription",
    slug,
    keywords,
    tags,
    url,
    "visible_on",
    "isParent",
    "order",
    "parentId",
    "createdAt",
    "updatedAt"
)
VALUES

(
    gen_random_uuid(),
    'Household Cleaners',
    'Household Cleaners | Multi-Surface & Bathroom Cleaning Products',
    'Household cleaning products including multi-surface cleaners, disinfectants, washing-up liquids, bathroom cleaners, kitchen cleaners, and cleaning sprays.',
    'Shop household cleaners including multi-surface sprays, disinfectants, bathroom cleaners, kitchen cleaners, and washing-up liquids for everyday cleaning needs.',
    'household-cleaners',
    'household cleaners, multi surface cleaner, disinfectant spray, bathroom cleaner, kitchen cleaner, washing up liquid, cleaning spray',
    ARRAY['cleaners'],
    '/grocery/home-care-cleaning/household-cleaners',
    'category-page',
    false,
    1,
    (SELECT id FROM "Category" WHERE slug = 'home-care-cleaning'),
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Cling Film & Foil',
    'Cling Film, Foil & Food Bags | Kitchen Storage Essentials',
    'Food storage and kitchen wrap products including cling film, aluminium foil, baking parchment, freezer bags, sandwich bags, and refuse sacks.',
    'Discover cling film, aluminium foil, freezer bags, sandwich bags, baking parchment, and food storage essentials for your kitchen.',
    'cling-film-foil-food-bags',
    'cling film, aluminium foil, freezer bags, sandwich bags, baking parchment, food bags, kitchen wraps',
    ARRAY['foil','food storage'],
    '/grocery/kitchen-wraps-food-bags/cling-film-foil-food-bags',
    'category-page',
    false,
    1,
    (SELECT id FROM "Category" WHERE slug = 'kitchen-wraps-food-bags'),
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Baking Accessories & Supplies',
    'Baking Accessories & Supplies | Bakeware Essentials',
    'Bakeware and baking essentials including baking trays, cake tins, cupcake cases, cooling racks, and baking accessories.',
    'Browse baking trays, cake tins, cupcake cases, cooling racks, and baking accessories perfect for home baking and cake decorating.',
    'baking-accessories-supplies',
    'baking accessories, bakeware, cake tins, baking trays, cupcake cases, cooling racks, baking supplies',
    ARRAY['baking'],
    '/grocery/bakeware/baking-accessories-supplies',
    'category-page',
    false,
    1,
    (SELECT id FROM "Category" WHERE slug = 'bakeware'),
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Storage Containers & Boxes',
    'Storage Containers & Boxes | Home Organisation Solutions',
    'Home storage solutions including storage boxes, baskets, drawer organisers, shelving accessories, and space-saving organisers.',
    'Organise your home with storage boxes, baskets, drawer organisers, shelving accessories, and space-saving storage solutions.',
    'storage-containers-boxes',
    'storage containers, storage boxes, home organisation, drawer organisers, storage baskets, shelving accessories',
    ARRAY['storage'],
    '/home-kitchen/storage-organisation/storage-containers-boxes',
    'category-page',
    false,
    1,
    (SELECT id FROM "Category" WHERE slug = 'storage-organisation'),
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Kitchen Storage & Organisation',
    'Kitchen Storage & Organisation | Pantry & Drawer Organisers',
    'Kitchen organisation products including spice racks, cupboard organisers, utensil holders, drawer dividers, and sink accessories.',
    'Keep your kitchen tidy with spice racks, cupboard organisers, utensil holders, sink accessories, and drawer dividers.',
    'kitchen-storage-organisation',
    'kitchen organisation, spice racks, cupboard organisers, utensil holders, drawer dividers, pantry storage',
    ARRAY['kitchen organisation'],
    '/home-kitchen/kitchen-organisation/kitchen-storage-organisation',
    'category-page',
    false,
    1,
    (SELECT id FROM "Category" WHERE slug = 'kitchen-organisation'),
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Laundry & Ironing Accessories',
    'Laundry & Ironing Accessories | Laundry Care Essentials',
    'Laundry care essentials including washing bags, clothes pegs, drying accessories, ironing board covers, and garment care products.',
    'Find laundry bags, clothes pegs, drying accessories, ironing board covers, and garment care products for everyday laundry care.',
    'laundry-ironing-accessories',
    'laundry accessories, ironing accessories, clothes pegs, drying rack accessories, ironing board cover, garment care',
    ARRAY['laundry'],
    '/home-kitchen/laundry-accessories/laundry-ironing-accessories',
    'category-page',
    false,
    1,
    (SELECT id FROM "Category" WHERE slug = 'laundry-accessories'),
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Kitchen & Cookware Accessories',
    'Kitchen & Cookware Accessories | Cooking Essentials',
    'Accessories for cooking and food preparation including pan protectors, pot stands, splatter guards, lids, and baking tools.',
    'Explore kitchen and cookware accessories including pan protectors, pot stands, splatter guards, lids, and baking tools.',
    'kitchen-cookware-accessories',
    'cookware accessories, kitchen accessories, pan protectors, splatter guards, pot stands, cooking tools',
    ARRAY['cookware'],
    '/home-kitchen/cookware-accessories/kitchen-cookware-accessories',
    'category-page',
    false,
    1,
    (SELECT id FROM "Category" WHERE slug = 'cookware-accessories'),
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Painting Supplies & Tools',
    'Painting Supplies & Tools | Decorating Essentials',
    'Decorating and painting essentials including paint brushes, rollers, trays, masking tape, dust sheets, and preparation tools.',
    'Shop painting and decorating supplies including paint brushes, rollers, trays, masking tape, and preparation tools.',
    'painting-supplies-tools',
    'painting supplies, decorating tools, paint brushes, paint rollers, masking tape, paint trays',
    ARRAY['painting'],
    '/diy-tools/decorating/painting-supplies-tools',
    'category-page',
    false,
    1,
    (SELECT id FROM "Category" WHERE slug = 'decorating'),
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Glues, Sealants & Fillers',
    'Glues, Sealants & Fillers | Adhesives & Repair Products',
    'Adhesives and sealing products including super glue, mounting tape, silicone sealants, fillers, and repair compounds.',
    'Discover adhesives, super glue, mounting tape, silicone sealants, fillers, and repair compounds for DIY and home repairs.',
    'glues-sealants-fillers',
    'adhesives, sealants, fillers, super glue, mounting tape, silicone sealant, repair compounds',
    ARRAY['sealants'],
    '/diy-tools/adhesives-sealers/glues-sealants-fillers',
    'category-page',
    false,
    1,
    (SELECT id FROM "Category" WHERE slug = 'adhesives-sealers'),
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Pots, Planters & Accessories',
    'Pots, Planters & Accessories | Indoor & Outdoor Gardening',
    'Gardening products including plant pots, hanging baskets, saucers, seed trays, and accessories for indoor and outdoor plants.',
    'Browse plant pots, hanging baskets, seed trays, saucers, and planter accessories for indoor and outdoor gardening.',
    'pots-planters-accessories',
    'plant pots, planters, hanging baskets, seed trays, gardening accessories, indoor plants',
    ARRAY['planters'],
    '/gardening/plant-pots-planters/pots-planters-accessories',
    'category-page',
    false,
    1,
    (SELECT id FROM "Category" WHERE slug = 'plant-pots-planters'),
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Pet Health & Pest Control',
    'Pet Health & Pest Control | Flea & Tick Treatments',
    'Pet care products for flea and tick prevention including flea treatments, sprays, shampoos, combs, and pest control accessories.',
    'Shop flea and tick treatments, pet sprays, shampoos, flea combs, and pest control products for dogs and cats.',
    'pet-health-pest-control',
    'flea treatment, tick control, pet health, flea shampoo, flea comb, pet pest control',
    ARRAY['pet health'],
    '/pet-supplies/flea-tick-control/pet-health-pest-control',
    'category-page',
    false,
    1,
    (SELECT id FROM "Category" WHERE slug = 'flea-tick-control'),
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Office Tape & Adhesives',
    'Office Tape & Adhesives | Stationery Adhesive Supplies',
    'Office and stationery adhesives including sticky tape, double-sided tape, glue sticks, and fastening products.',
    'Find office tape, double-sided tape, glue sticks, sticky tape, and adhesive products for home, school, and office use.',
    'office-tape-adhesives',
    'office tape, adhesives, glue sticks, sticky tape, double sided tape, stationery supplies',
    ARRAY['office tape'],
    '/stationery-office-supplies/tape-adhesives/office-tape-adhesives',
    'category-page',
    false,
    1,
    (SELECT id FROM "Category" WHERE slug = 'tape-adhesives'),
    NOW(),
    NOW()
),

(
    gen_random_uuid(),
    'Paper',
    'Paper Products | Office Paper & Stationery Supplies',
    'Office paper products including printer paper, notebooks, sticky notes, envelopes, labels, and writing pads.',
    'Explore printer paper, notebooks, sticky notes, labels, envelopes, and writing pads for office and school needs.',
    'paper-products',
    'paper products, printer paper, notebooks, sticky notes, envelopes, office stationery, labels',
    ARRAY['paper'],
    '/stationery-office-supplies/paper-products-category/paper-products',
    'category-page',
    false,
    1,
    (SELECT id FROM "Category" WHERE slug = 'paper-products-category'),
    NOW(),
    NOW()
)
ON CONFLICT (slug) DO NOTHING;

COMMIT;

CREATE INDEX IF NOT EXISTS idx_category_parent
ON "Category"("parentId");

CREATE INDEX IF NOT EXISTS idx_category_order
ON "Category"("order");