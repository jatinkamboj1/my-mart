-- =============================================
-- PRODUCT IMPORT SCRIPT
-- Generated from WooCommerce CSV
-- PostgreSQL + Prisma
-- =============================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '2b9248b2-5b21-4c34-a149-1ebe954eb949',
    'ADMIN',
    'Crystal 45L Box & Lid Clear',
    'crystal-45l-box-lid-clear',
    '10870',
    4.75,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">High quality 45 litre storage box with clip on lid. Versatile storage suitable for all around the home and workplace. Boxes are stackable when in use and nest when not.</span><br></p>',
    'Code: 10870
Dimensions: 60.00 x 40.00 x 25.00 cm
Weight: 1.4512 kg',
    'simple',
    'Crystal 45L Box & Lid Clear | Buy Online at Best Price',
    'Shop Crystal 45L Box & Lid Clear online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '2b9248b2-5b21-4c34-a149-1ebe954eb949'
FROM "Category" c
WHERE c.slug = 'storage-containers-boxes'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/5ef6d2395cce1f5a9d3596799e8d6434.jpg',
    'PRODUCT',
    '2b9248b2-5b21-4c34-a149-1ebe954eb949',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/03d586543868670efcaf84ec6867d9b7.png',
    'PRODUCT',
    '2b9248b2-5b21-4c34-a149-1ebe954eb949',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    'c0578af2-6e78-45c6-9683-64714c69d43a',
    'ADMIN',
    'Crystal 37 Litre Box & Lid Clear',
    'crystal-37-litre-box-lid-clear',
    '25425',
    3.43,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">37 litre storage box with click on lid. Versatile storage suitable for all around the home and workplace.</span><br></p>',
    'Code: 25425
Dimensions: 48.00 x 38.50 x 26.00 cm
Weight: 0.845 kg',
    'simple',
    'Crystal 37 Litre Box & Lid Clear | Buy Online at Best Price',
    'Shop Crystal 37 Litre Box & Lid Clear online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, 'c0578af2-6e78-45c6-9683-64714c69d43a'
FROM "Category" c
WHERE c.slug = 'storage-containers-boxes'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/bf17cf3f6d5de94bb6654622d74cf276.png',
    'PRODUCT',
    'c0578af2-6e78-45c6-9683-64714c69d43a',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/024e4622b2c9802827706a7f77e158f4.png',
    'PRODUCT',
    'c0578af2-6e78-45c6-9683-64714c69d43a',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '6cdbdd8e-d41c-46bf-a8c8-5c9c62149e88',
    'ADMIN',
    'Crystal 32L U/bed Box & Lid Clear',
    'crystal-32l-u-bed-box-lid-clear',
    '10860',
    3.71,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Versatile storage suitable for all around the home and workplace. The low profile design makes it ideal for underbed storage and moves easily on its integral sliders.</span><br></p>',
    'Code: 10860
Dimensions: 60.00 x 40.00 x 18.00 cm
Weight: 1.1215 kg',
    'simple',
    'Crystal 32L U/bed Box & Lid Clear | Buy Online at Best Price',
    'Shop Crystal 32L U/bed Box & Lid Clear online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '6cdbdd8e-d41c-46bf-a8c8-5c9c62149e88'
FROM "Category" c
WHERE c.slug = 'storage-containers-boxes'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/6c5f2124a8416137c1a2ab408674ad4d.png',
    'PRODUCT',
    '6cdbdd8e-d41c-46bf-a8c8-5c9c62149e88',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/9a4dc476a7aa78868d3f9e8baa4a2932.png',
    'PRODUCT',
    '6cdbdd8e-d41c-46bf-a8c8-5c9c62149e88',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/6d40103c0ad6a80334cefec4fe382506.png',
    'PRODUCT',
    '6cdbdd8e-d41c-46bf-a8c8-5c9c62149e88',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/207eccd9f390752bb105fb755823d2ac.png',
    'PRODUCT',
    '6cdbdd8e-d41c-46bf-a8c8-5c9c62149e88',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/b8f3b9962ea0d3ae7ad508103124442f.jpg',
    'PRODUCT',
    '6cdbdd8e-d41c-46bf-a8c8-5c9c62149e88',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/0b06952b4d5f904507ce67b9b854ed30.jpg',
    'PRODUCT',
    '6cdbdd8e-d41c-46bf-a8c8-5c9c62149e88',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '0df7ad73-3a29-400c-8f96-4cfe4199c01e',
    'ADMIN',
    'Crystal 25L Box & Lid Clear',
    'crystal-25l-box-lid-clear',
    '25375',
    2.81,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">25 litre storage box with click on lid. Versatile storage suitable for all around the home and workplace.</span><br></p>',
    'Code: 25375
Dimensions: 42.50 x 33.00 x 25.50 cm
Weight: 0.68 kg',
    'simple',
    'Crystal 25L Box & Lid Clear | Buy Online at Best Price',
    'Shop Crystal 25L Box & Lid Clear online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '0df7ad73-3a29-400c-8f96-4cfe4199c01e'
FROM "Category" c
WHERE c.slug = 'storage-containers-boxes'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/9575ffc6dff2ff5c3ffb9eac70e61947.png',
    'PRODUCT',
    '0df7ad73-3a29-400c-8f96-4cfe4199c01e',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/0cba353a4250230344fb0f08da915fcf.png',
    'PRODUCT',
    '0df7ad73-3a29-400c-8f96-4cfe4199c01e',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '76680cde-fc33-4670-9fb3-1707f86eab02',
    'ADMIN',
    'Crystal 17 Litre Box & Lid Clear',
    'crystal-17-litre-box-lid-clear',
    '25350',
    2.29,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">17 litre storage box with click on lid. Versatile storage suitable for all around the home and workplace.</span><br></p>',
    'Code: 25350
Dimensions: 42.50 x 33.00 x 17.00 cm
Weight: 0.56 kg',
    'simple',
    'Crystal 17 Litre Box & Lid Clear | Buy Online at Best Price',
    'Shop Crystal 17 Litre Box & Lid Clear online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '76680cde-fc33-4670-9fb3-1707f86eab02'
FROM "Category" c
WHERE c.slug = 'storage-containers-boxes'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/d2078151427cf225c025003150e09fdb.png',
    'PRODUCT',
    '76680cde-fc33-4670-9fb3-1707f86eab02',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/e3b6449b8d04109adcff8641b7fb013e.png',
    'PRODUCT',
    '76680cde-fc33-4670-9fb3-1707f86eab02',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    'f60979f1-6d12-4e4b-b24d-3e901f2d1ed4',
    'ADMIN',
    'Crystal 11 Litre Box & Lid Clear',
    'crystal-11-litre-box-lid-clear',
    '25326',
    1.72,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Versatile storage box with lid, suitable for all around the home or workplace.</span><br></p>',
    'Code: 25326
Dimensions: 36.50 x 25.00 x 17.50 cm
Weight: 0.413 kg',
    'simple',
    'Crystal 11 Litre Box & Lid Clear | Buy Online at Best Price',
    'Shop Crystal 11 Litre Box & Lid Clear online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, 'f60979f1-6d12-4e4b-b24d-3e901f2d1ed4'
FROM "Category" c
WHERE c.slug = 'storage-containers-boxes'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/75851810a6c6fa05e3884484325f7c31.png',
    'PRODUCT',
    'f60979f1-6d12-4e4b-b24d-3e901f2d1ed4',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/dae3e6bfb9ab8110ffa653384717e52e.jpg',
    'PRODUCT',
    'f60979f1-6d12-4e4b-b24d-3e901f2d1ed4',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/9584ba60026682670cfe0b9cb033ed5a.jpg',
    'PRODUCT',
    'f60979f1-6d12-4e4b-b24d-3e901f2d1ed4',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/a53a6178ac87f25494825cd83b234610.jpg',
    'PRODUCT',
    'f60979f1-6d12-4e4b-b24d-3e901f2d1ed4',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/c093d828cd1e280d31b17290600a056e.jpg',
    'PRODUCT',
    'f60979f1-6d12-4e4b-b24d-3e901f2d1ed4',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/981c5f07c201bffeddbac05da46364c4.png',
    'PRODUCT',
    'f60979f1-6d12-4e4b-b24d-3e901f2d1ed4',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '2b54811e-68b6-4bf6-85bd-20c98265d45f',
    'ADMIN',
    'Recycle It 25L Slimline Bin & Lid Graphite/Gen. Green',
    'recycle-it-25l-slimline-bin-lid-graphite-gen-green',
    '12412',
    5.18,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Easy to clean and a choice of 4 lid colours for various recycling uses. Handy slim-line fit.</span><br></p>',
    'Code: 12412
Dimensions: 40.00 x 19.00 x 51.00 cm
Weight: 1.225 kg',
    'simple',
    'Recycle It 25L Slimline Bin & Lid Graphite/Gen. Green | Buy Online at Best Price',
    'Shop Recycle It 25L Slimline Bin & Lid Graphite/Gen. Green online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '2b54811e-68b6-4bf6-85bd-20c98265d45f'
FROM "Category" c
WHERE c.slug = 'storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/a3963bb88421a1bd8814d17570cbac6f.jpg',
    'PRODUCT',
    '2b54811e-68b6-4bf6-85bd-20c98265d45f',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/c56b3e2f48c8d93d511d49f522726250.jpg',
    'PRODUCT',
    '2b54811e-68b6-4bf6-85bd-20c98265d45f',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/795c7507a1c39f5b20f614eb6d71742d.jpg',
    'PRODUCT',
    '2b54811e-68b6-4bf6-85bd-20c98265d45f',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/50198dae1f93a048f681dcb428070ffa.jpg',
    'PRODUCT',
    '2b54811e-68b6-4bf6-85bd-20c98265d45f',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/ae732722830bdffe17944379e09b74cf.jpg',
    'PRODUCT',
    '2b54811e-68b6-4bf6-85bd-20c98265d45f',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/87c876c655ac69d960c62d7895778c05.png',
    'PRODUCT',
    '2b54811e-68b6-4bf6-85bd-20c98265d45f',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/75a5059db03a5cbe77bbb7da9c8f53fe.jpg',
    'PRODUCT',
    '2b54811e-68b6-4bf6-85bd-20c98265d45f',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    'dfef6c4d-9ea0-4249-b515-43c01b7ddac1',
    'ADMIN',
    'Bacofoil® EasyCut Cling Film Dispenser',
    'bacofoil-easycut-cling-film-dispenser',
    '71B25',
    3.48,
    NULL,
    NULL,
    100,
    TRUE,
    '<p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">Quick and easy to use, The Bacofoil<sup>®</sup>&nbsp;Refillable EasyCut Cling Film Dispenser will help you to banish frayed tempers and wasted scrunched-up balls of cling film forever!</p><p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">With a bespoke cutting system, the Bacofoil<sup>®</sup>&nbsp;Refillable EasyCut Cling Film Dispenser is built to last and designed to cut perfectly. With it’s end finding grip there’s no need to search for the end bits anymore.</p>',
    'Quick and easy to use, The Bacofoil® Refillable EasyCut Cling Film Dispenser is built to last and designed to cut perfectly.
Easy to use Close and Cut system
Safe and Hygienic
Bacofoil® Ea',
    'simple',
    'Bacofoil® EasyCut Cling Film Dispenser | Buy Online at Best Price',
    'Shop Bacofoil® EasyCut Cling Film Dispenser online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, 'dfef6c4d-9ea0-4249-b515-43c01b7ddac1'
FROM "Category" c
WHERE c.slug = 'storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/823c7aab633d4cb29910617128c352f4.jpg',
    'PRODUCT',
    'dfef6c4d-9ea0-4249-b515-43c01b7ddac1',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/85cc07b06a3cda8b1208bef973f683a4.jpg',
    'PRODUCT',
    'dfef6c4d-9ea0-4249-b515-43c01b7ddac1',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '5394fa02-9452-42ad-b9d1-10ca1180108d',
    'ADMIN',
    'Bacofoil® EasyCut Foil Dispenser',
    'bacofoil-easycut-foil-dispenser',
    'nan',
    2.16,
    NULL,
    NULL,
    100,
    TRUE,
    '<p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">For quick, rip-free foil every time, The Bacofoil<sup>®</sup>&nbsp;Refillable EasyCut Foil Dispenser with 5m Starter Roll makes baking, grilling and food wrapping easy day in, day out.</p><p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">With a bespoke cutting system, the dispenser is designed to cut foil perfectly. At 30cm it’s still the perfect size for the majority of kitchen drawers and as it’s refillable it can be used again and again.</p>',
    'Easy to use Close and Cut system
Tear & Heat-resistant
Reusable
For quick, rip-free foil every time, The Bacofoil® Refillable EasyCut Foil Dispenser with it’s bespoke cutting system.',
    'simple',
    'Bacofoil® EasyCut Foil Dispenser | Buy Online at Best Price',
    'Shop Bacofoil® EasyCut Foil Dispenser online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '5394fa02-9452-42ad-b9d1-10ca1180108d'
FROM "Category" c
WHERE c.slug = 'storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/f37f12943ed1794915bec37bff24cca0.jpg',
    'PRODUCT',
    '5394fa02-9452-42ad-b9d1-10ca1180108d',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/b52619ead78b24f9e2c20d5707b470b6.jpg',
    'PRODUCT',
    '5394fa02-9452-42ad-b9d1-10ca1180108d',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '69f5c751-dbd4-47ad-907e-9975d46495d5',
    'ADMIN',
    'Recycle It 25L Slimline Bin & Lid Graphite/Gen. Yellow',
    'recycle-it-25l-slimline-bin-lid-graphite-gen-yellow',
    '12413',
    5.18,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Easy to clean and a choice of 4 lid colours for various recycling uses. Handy slim-line fit.</span><br></p>',
    'Code: 12413
Dimensions: 40.00 x 19.00 x 51.00 cm
Weight: 1.225 kg',
    'simple',
    'Recycle It 25L Slimline Bin & Lid Graphite/Gen. Yellow | Buy Online at Best Price',
    'Shop Recycle It 25L Slimline Bin & Lid Graphite/Gen. Yellow online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '69f5c751-dbd4-47ad-907e-9975d46495d5'
FROM "Category" c
WHERE c.slug = 'storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/9b01b8aecfd06023377a366eda42c1aa.jpg',
    'PRODUCT',
    '69f5c751-dbd4-47ad-907e-9975d46495d5',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/c12591ced2052a445fc85a12e7fe8cdb.jpg',
    'PRODUCT',
    '69f5c751-dbd4-47ad-907e-9975d46495d5',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/973706db90a94990f0e38f290bb6b84b.jpg',
    'PRODUCT',
    '69f5c751-dbd4-47ad-907e-9975d46495d5',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/744b660cd75216969b9e72ff948186c4.jpg',
    'PRODUCT',
    '69f5c751-dbd4-47ad-907e-9975d46495d5',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/ceddf3ac5d6f4dd2b44d7a4d2172c806.jpg',
    'PRODUCT',
    '69f5c751-dbd4-47ad-907e-9975d46495d5',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/9e7284b8e110778d4025bd286c2695d7.png',
    'PRODUCT',
    '69f5c751-dbd4-47ad-907e-9975d46495d5',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '0eefad59-a0f5-498e-9743-bf70aa005973',
    'ADMIN',
    'Casa 50L Swing Bin Silver',
    'casa-50l-swing-bin-silver',
    '11755',
    7.44,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Large 50 litre capacity bin with swing style lid. Made from lightweight, yet durable and easy to clean plastic.</span><br></p>',
    'Code: 11755
Dimensions: 40.00 x 33.00 x 66.50 cm
Weight: 1.689 kg',
    'simple',
    'Casa 50L Swing Bin Silver | Buy Online at Best Price',
    'Shop Casa 50L Swing Bin Silver online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '0eefad59-a0f5-498e-9743-bf70aa005973'
FROM "Category" c
WHERE c.slug = 'kitchen-storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/6a443d6c8a4bc0cab62f5e9e84a0b375.png',
    'PRODUCT',
    '0eefad59-a0f5-498e-9743-bf70aa005973',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '44fb609a-a57c-432f-b3b2-b9429d361833',
    'ADMIN',
    'Casa Large Dish Drainer Silver',
    'casa-large-dish-drainer-silver',
    '11295',
    1.96,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Stylish large dish drainer. Holds up to 12 plates with two handy cutlery drainer compartments and additional drainer space for cups and glasses. Cleverly designed with integral handles. Strong, durable and easy to maintain.</span><br></p>',
    'Code: 11295
Dimensions: 46.50 x 38.00 x 9.00 cm
Weight: 0.4685 kg',
    'simple',
    'Casa Large Dish Drainer Silver | Buy Online at Best Price',
    'Shop Casa Large Dish Drainer Silver online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '44fb609a-a57c-432f-b3b2-b9429d361833'
FROM "Category" c
WHERE c.slug = 'kitchen-storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/79994881da6ead66c4e4a3e307c8c9ee.png',
    'PRODUCT',
    '44fb609a-a57c-432f-b3b2-b9429d361833',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/ad2a69684b2a7ac14c453d5394ebccae.png',
    'PRODUCT',
    '44fb609a-a57c-432f-b3b2-b9429d361833',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/5cfe9c68ee64d5ec50cc14834f8a27e0.png',
    'PRODUCT',
    '44fb609a-a57c-432f-b3b2-b9429d361833',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/94bbcbf56605eb67f87844b1d8075897.png',
    'PRODUCT',
    '44fb609a-a57c-432f-b3b2-b9429d361833',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/9cfa38edb54af0f77105a9cb9a97c705.jpg',
    'PRODUCT',
    '44fb609a-a57c-432f-b3b2-b9429d361833',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    'dd3157aa-9a23-4e36-842b-1dba20a026ed',
    'ADMIN',
    'Casa Large Dish Drainer Midnight',
    'casa-large-dish-drainer-midnight',
    '17280',
    1.96,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Stylish large dish drainer. Holds up to 12 plates with two handy cutlery drainer compartments and additional drainer space for cups and glasses. Cleverly designed with integral handles. Strong, durable and easy to maintain.</span><br></p>',
    'Code: 17280
Dimensions: 46.50 x 38.00 x 9.00 cm
Weight: 0.4685 kg',
    'simple',
    'Casa Large Dish Drainer Midnight | Buy Online at Best Price',
    'Shop Casa Large Dish Drainer Midnight online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, 'dd3157aa-9a23-4e36-842b-1dba20a026ed'
FROM "Category" c
WHERE c.slug = 'kitchen-storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/de83b5100e08b0c08e67e7902c4fc339.png',
    'PRODUCT',
    'dd3157aa-9a23-4e36-842b-1dba20a026ed',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/d0d2f568b7f9d07fcf18cb20976d9c16.png',
    'PRODUCT',
    'dd3157aa-9a23-4e36-842b-1dba20a026ed',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/96f47d62513329dcbb76ec29290c5e86.png',
    'PRODUCT',
    'dd3157aa-9a23-4e36-842b-1dba20a026ed',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/00ee6fddc6ad31fcf9279a6430b53817.png',
    'PRODUCT',
    'dd3157aa-9a23-4e36-842b-1dba20a026ed',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/dae61fa5b22445821eb4515ca9ada938.jpg',
    'PRODUCT',
    'dd3157aa-9a23-4e36-842b-1dba20a026ed',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '93cdfb87-3dcf-4484-b20f-fec1bf832edb',
    'ADMIN',
    'Bacofoil® EasyCut Foil Refill',
    'bacofoil-easycut-foil-refill',
    '27B07',
    2.23,
    NULL,
    NULL,
    100,
    TRUE,
    '<p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">The perfect partner to the Bacofoil<sup>®</sup>&nbsp;Refillable EasyCut Foil Dispenser. The Bacofoil<sup>®</sup>&nbsp;EasyCut Foil Refill contains 15m of high quality foil and is incredibly versatile and easy to use.</p><p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">Perfect for grilling, roasting and wrapping food, and can even be used to store leftovers in the refrigerator or freezer. With it’s tear resistant properties, Bacofoil<sup>®</sup>&nbsp;EasyCut Foil Refill can be moulded to any shape you like. Able to withstand high heat and extreme cold, it’s the perfect all rounder for protecting food.</p>',
    'The perfect partner to the Bacofoil® Refillable EasyCut Foil Dispenser, incredibly versatile system and easy to use.',
    'simple',
    'Bacofoil® EasyCut Foil Refill | Buy Online at Best Price',
    'Shop Bacofoil® EasyCut Foil Refill online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '93cdfb87-3dcf-4484-b20f-fec1bf832edb'
FROM "Category" c
WHERE c.slug = 'kitchen-cookware-accessories'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/89c528db25ce6dc5718d04020b5eec7c.jpg',
    'PRODUCT',
    '93cdfb87-3dcf-4484-b20f-fec1bf832edb',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/d98b594cd87d38810c1b4b1a768b3f53.jpg',
    'PRODUCT',
    '93cdfb87-3dcf-4484-b20f-fec1bf832edb',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '0d694b42-078c-49bb-af03-78af1ac67bc9',
    'ADMIN',
    'Bacofoil® The Non-Stick Kitchen Foil',
    'bacofoil-the-non-stick-kitchen-foil',
    'nan',
    1.16,
    NULL,
    NULL,
    100,
    TRUE,
    '<p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">Ensure there are no sticky situations with Bacofoil<sup>®</sup>&nbsp;Non-Stick Kitchen Foil. With its unique BacoLift<sup>®</sup>&nbsp;Surface, even the most notorious culprits couldn’t stick to the foil if they tried. Not to mention with no need to use oil or butter it’s the healthier option too. There is even the added benefit of no washing up afterwards!</p><p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">Now the newly designed, easy to handle, ergonomic packaging, has a unique Easy-Cut System with curved blade to improve the cutting of the foil, guaranteeing a perfect cut every time, reducing waste!</p>',
    'Unique Easy-Cut System with curved blade
Unique Non-Stick BacoLift® Surface
Tear & Heat-resistant
Bacofoil® The Non-Stick Kitchen Foil Ensures that your food won’t stick with it’s unique B',
    'simple',
    'Bacofoil® The Non-Stick Kitchen Foil | Buy Online at Best Price',
    'Shop Bacofoil® The Non-Stick Kitchen Foil online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '0d694b42-078c-49bb-af03-78af1ac67bc9'
FROM "Category" c
WHERE c.slug = 'kitchen-cookware-accessories'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230711/528d20dc3c6fbd7be241334a2fb36f08.jpg',
    'PRODUCT',
    '0d694b42-078c-49bb-af03-78af1ac67bc9',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '8c210587-54ea-4b5a-9513-d1d1723dfed5',
    'ADMIN',
    'Casa 39cm Rectangular Bowl Silver',
    'casa-39cm-rectangular-bowl-silver',
    '11285',
    1.16,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">39cm rectangular washing up bowl. Stylish design with a high gloss chic finish. Cleverly designed with integral handles. Strong, durable and easy to maintain. Approximately 12 litre capacity.</span><br></p>',
    'Code: 11285
Dimensions: 39.00 x 32.00 x 16.00 cm
Weight: 0.329 kg',
    'simple',
    'Casa 39cm Rectangular Bowl Silver | Buy Online at Best Price',
    'Shop Casa 39cm Rectangular Bowl Silver online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '8c210587-54ea-4b5a-9513-d1d1723dfed5'
FROM "Category" c
WHERE c.slug = 'kitchen-storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/1807ae995008eaa56656649a6e2b8e59.png',
    'PRODUCT',
    '8c210587-54ea-4b5a-9513-d1d1723dfed5',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/16deb8386221ad91f58c982993c86290.png',
    'PRODUCT',
    '8c210587-54ea-4b5a-9513-d1d1723dfed5',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/3e6f946bf9e1deaed1a407feb61866af.png',
    'PRODUCT',
    '8c210587-54ea-4b5a-9513-d1d1723dfed5',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/b40d31178560b65adace4386f24dc3a6.png',
    'PRODUCT',
    '8c210587-54ea-4b5a-9513-d1d1723dfed5',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/921e19e06eec4b755709b9497b952b56.png',
    'PRODUCT',
    '8c210587-54ea-4b5a-9513-d1d1723dfed5',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '2eebf701-1833-4006-a44a-ddcf84571e09',
    'ADMIN',
    'Casa Kitchen Tidy/Organiser Caddy Silver',
    'casa-kitchen-tidy-organiser-caddy-silver',
    '12435',
    2.48,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Strong very robust is ideal for many applications such as gardening, housework, hobbies etc. Both compartments approximately 5 litre capacity.</span><br></p>',
    'Code: 12435
Dimensions: 38.00 x 31.50 x 20.00 cm
Weight: 0.6825 kg',
    'simple',
    'Casa Kitchen Tidy/Organiser Caddy Silver | Buy Online at Best Price',
    'Shop Casa Kitchen Tidy/Organiser Caddy Silver online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '2eebf701-1833-4006-a44a-ddcf84571e09'
FROM "Category" c
WHERE c.slug = 'kitchen-storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/8445957f562063e05b422934c31f6c23.png',
    'PRODUCT',
    '2eebf701-1833-4006-a44a-ddcf84571e09',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/d22eaddfb76d5c67238150ace92ac3d5.jpg',
    'PRODUCT',
    '2eebf701-1833-4006-a44a-ddcf84571e09',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '0dcf4641-a51b-4c9d-8c0c-b58b31122e70',
    'ADMIN',
    'Bacofoil® The Non-Stick 300mm x 10m',
    'bacofoil-the-non-stick-300mm-x-10m',
    '42B01',
    2.0,
    NULL,
    NULL,
    100,
    TRUE,
    '<p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">Ensure there are no sticky situations with Bacofoil<sup>®</sup>&nbsp;Non-Stick Kitchen Foil. With its unique BacoLift<sup>®</sup>&nbsp;Surface, even the most notorious culprits couldn’t stick to the foil if they tried. Not to mention with no need to use oil or butter it’s the healthier option too. There is even the added benefit of no washing up afterwards!</p><p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">Now the newly designed, easy to handle, ergonomic packaging, has a unique Easy-Cut System with curved blade to improve the cutting of the foil, guaranteeing a perfect cut every time, reducing waste!</p>',
    'Bacofoil® The Non-Stick Kitchen Foil Ensures that your food won’t stick with it’s unique Bacolift® surface. Not to mention it’s new Easy-cut system delivering the perfect cut of foil every ti',
    'simple',
    'Bacofoil® The Non-Stick 300mm x 10m | Buy Online at Best Price',
    'Shop Bacofoil® The Non-Stick 300mm x 10m online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '0dcf4641-a51b-4c9d-8c0c-b58b31122e70'
FROM "Category" c
WHERE c.slug = 'kitchen-cookware-accessories'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/83de9cad9f817003e3cde42630525046.png',
    'PRODUCT',
    '0dcf4641-a51b-4c9d-8c0c-b58b31122e70',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/9032d5dbc9fec9890ffd5babac2b9c59.jpg',
    'PRODUCT',
    '0dcf4641-a51b-4c9d-8c0c-b58b31122e70',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/0e60f03b736a6c6d5e56071e1c45a1c3.jpg',
    'PRODUCT',
    '0dcf4641-a51b-4c9d-8c0c-b58b31122e70',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/93e97da70ba9a39005602b89e2fe80be.jpg',
    'PRODUCT',
    '0dcf4641-a51b-4c9d-8c0c-b58b31122e70',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    'a295a3da-b2a0-429e-91a9-1d684cd2ed25',
    'ADMIN',
    'Casa Kitchen Tidy/Organiser Caddy Midnight',
    'casa-kitchen-tidy-organiser-caddy-midnight',
    '17380',
    2.48,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Strong very robust is ideal for many applications such as gardening, housework, hobbies etc. Both compartments approximately 5 litre capacity.</span><br></p>',
    'Code: 17380
Dimensions: 38.00 x 31.50 x 20.00 cm
Weight: 0.6825 kg',
    'simple',
    'Casa Kitchen Tidy/Organiser Caddy Midnight | Buy Online at Best Price',
    'Shop Casa Kitchen Tidy/Organiser Caddy Midnight online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, 'a295a3da-b2a0-429e-91a9-1d684cd2ed25'
FROM "Category" c
WHERE c.slug = 'kitchen-storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/f8b55e2772a699e22fd39fb40aed12a7.png',
    'PRODUCT',
    'a295a3da-b2a0-429e-91a9-1d684cd2ed25',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    'a6d57ce0-7c02-4c6a-8ebe-720373329e9c',
    'ADMIN',
    'Casa Hipster Laundry Basket Silver',
    'casa-hipster-laundry-basket-silver',
    '10088',
    2.82,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Deluxe hipster laundry basket. Oval with an inward curve at one side to aid carrying. Integral handles. Strong and hardwearing. Easy to clean and maintain.</span><br></p>',
    'Code: 10088
Dimensions: 60.00 x 39.00 x 30.50 cm
Weight: 0.7715 kg',
    'simple',
    'Casa Hipster Laundry Basket Silver | Buy Online at Best Price',
    'Shop Casa Hipster Laundry Basket Silver online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, 'a6d57ce0-7c02-4c6a-8ebe-720373329e9c'
FROM "Category" c
WHERE c.slug = 'kitchen-storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/5c97d807adad761f1a259bfbc17a6dcf.png',
    'PRODUCT',
    'a6d57ce0-7c02-4c6a-8ebe-720373329e9c',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/4959fede45084d3a861fd9bfb24753f4.png',
    'PRODUCT',
    'a6d57ce0-7c02-4c6a-8ebe-720373329e9c',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/99701c87bae4b742c28e72fff4ab867b.png',
    'PRODUCT',
    'a6d57ce0-7c02-4c6a-8ebe-720373329e9c',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/268160eb6b10a8748e2fef85e7e92db9.jpg',
    'PRODUCT',
    'a6d57ce0-7c02-4c6a-8ebe-720373329e9c',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/399b76dcea04a261a12a106d63a14651.png',
    'PRODUCT',
    'a6d57ce0-7c02-4c6a-8ebe-720373329e9c',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/a52c650a5c5edfa59d078180a8d68c4e.jpg',
    'PRODUCT',
    'a6d57ce0-7c02-4c6a-8ebe-720373329e9c',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/e8b396a51e8eab261a0a3fc3cae942a1.jpg',
    'PRODUCT',
    'a6d57ce0-7c02-4c6a-8ebe-720373329e9c',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '6b21ebdb-08e1-4460-bdd4-18c970cd610c',
    'ADMIN',
    'Casa Hipster Laundry Basket Midnight',
    'casa-hipster-laundry-basket-midnight',
    '17483',
    2.82,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Deluxe hipster laundry basket. Oval with an inward curve at one side to aid carrying. Integral handles. Strong and hardwearing. Easy to clean and maintain.</span><br></p>',
    'Code: 17483
Dimensions: 60.00 x 39.00 x 30.50 cm
Weight: 0.7715 kg',
    'simple',
    'Casa Hipster Laundry Basket Midnight | Buy Online at Best Price',
    'Shop Casa Hipster Laundry Basket Midnight online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '6b21ebdb-08e1-4460-bdd4-18c970cd610c'
FROM "Category" c
WHERE c.slug = 'kitchen-storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/822f994badf3ffdd85f0e44b6c10dc7a.png',
    'PRODUCT',
    '6b21ebdb-08e1-4460-bdd4-18c970cd610c',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/e81b615ab24811684b636c008660f90e.png',
    'PRODUCT',
    '6b21ebdb-08e1-4460-bdd4-18c970cd610c',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/8d4071b929599de762a7ab2f8bc41704.png',
    'PRODUCT',
    '6b21ebdb-08e1-4460-bdd4-18c970cd610c',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/b1b45626cdc2fa154e53de16d16e8584.jpg',
    'PRODUCT',
    '6b21ebdb-08e1-4460-bdd4-18c970cd610c',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/d8f8cb86cc5a2f8216bf3aba4dac8214.png',
    'PRODUCT',
    '6b21ebdb-08e1-4460-bdd4-18c970cd610c',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/1a5207b3995dd8ba2349718274b48aca.jpg',
    'PRODUCT',
    '6b21ebdb-08e1-4460-bdd4-18c970cd610c',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '8d07091a-907b-41e8-84b6-b1a2bc3955b5',
    'ADMIN',
    'Bacofoil® The Non-Stick 300mm x 5m',
    'bacofoil-the-non-stick-300mm-x-5m',
    '42B02',
    1.16,
    NULL,
    NULL,
    100,
    TRUE,
    '<p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">Ensure there are no sticky situations with Bacofoil<sup>®</sup>&nbsp;Non-Stick Kitchen Foil. With its unique BacoLift<sup>®</sup>&nbsp;Surface, even the most notorious culprits couldn’t stick to the foil if they tried. Not to mention with no need to use oil or butter it’s the healthier option too. There is even the added benefit of no washing up afterwards!</p><p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">Now the newly designed, easy to handle, ergonomic packaging, has a unique Easy-Cut System with curved blade to improve the cutting of the foil, guaranteeing a perfect cut every time, reducing waste!</p>',
    '300mm x 5m',
    'simple',
    'Bacofoil® The Non-Stick 300mm x 5m | Buy Online at Best Price',
    'Shop Bacofoil® The Non-Stick 300mm x 5m online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '8d07091a-907b-41e8-84b6-b1a2bc3955b5'
FROM "Category" c
WHERE c.slug = 'kitchen-cookware-accessories'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/83de9cad9f817003e3cde42630525046.png',
    'PRODUCT',
    '8d07091a-907b-41e8-84b6-b1a2bc3955b5',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '2b573405-14a6-4af0-bc4b-9b606a5d4602',
    'ADMIN',
    'Wham Bam 16L H.Duty Box & Lid Black Recycled',
    'wham-bam-16l-h-duty-box-lid-black-recycled',
    '445040',
    3.32,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Manufactured from 100% recycled plastic. Resists high impact damage. Durable and strong, even in cold temperatures. The box has been strength tested to 380kg! Lid snaps into place and features holes to add tie-wraps for added security</span><br></p>',
    'Code: 445040
Dimensions: 38.50 x 29.00 x 21.50 cm
Weight: 1.25 kg',
    'simple',
    'Wham Bam 16L H.Duty Box & Lid Black Recycled | Buy Online at Best Price',
    'Shop Wham Bam 16L H.Duty Box & Lid Black Recycled online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '2b573405-14a6-4af0-bc4b-9b606a5d4602'
FROM "Category" c
WHERE c.slug = 'storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/739c59a2ea60821d53d54b7d5222a04c.jpg',
    'PRODUCT',
    '2b573405-14a6-4af0-bc4b-9b606a5d4602',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/cbd902b1f209744fc1ea191b59f46eff.jpg',
    'PRODUCT',
    '2b573405-14a6-4af0-bc4b-9b606a5d4602',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/8c11cd2f6abb13dfd7028286a8812db7.png',
    'PRODUCT',
    '2b573405-14a6-4af0-bc4b-9b606a5d4602',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/fcaba924a3d66841123e460747d797c2.jpg',
    'PRODUCT',
    '2b573405-14a6-4af0-bc4b-9b606a5d4602',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    'dbadf004-4a61-4d9e-ace9-04fbebb7d4e2',
    'ADMIN',
    'Wham Bam 24L H.Duty Box & Lid Black Recycled',
    'wham-bam-24l-h-duty-box-lid-black-recycled',
    '445060',
    4.08,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Manufactured from 100% recycled plastic. Resists high impact damage. Durable and strong, even in cold temperatures. The box has been strength tested to 380kg! Lid snaps into place and features holes to add tie-wraps for added security</span><br></p>',
    'Code: 445060
Dimensions: 38.50 x 29.00 x 31.50 cm
Weight: 1.588 kg',
    'simple',
    'Wham Bam 24L H.Duty Box & Lid Black Recycled | Buy Online at Best Price',
    'Shop Wham Bam 24L H.Duty Box & Lid Black Recycled online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, 'dbadf004-4a61-4d9e-ace9-04fbebb7d4e2'
FROM "Category" c
WHERE c.slug = 'storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/82a27a63b34f2229e6272fcdec8f2e99.jpg',
    'PRODUCT',
    'dbadf004-4a61-4d9e-ace9-04fbebb7d4e2',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/acf21048f21357e95096fccfc3b7aa1d.png',
    'PRODUCT',
    'dbadf004-4a61-4d9e-ace9-04fbebb7d4e2',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/01780620f27f21277c1d5fc3f502cf69.jpg',
    'PRODUCT',
    'dbadf004-4a61-4d9e-ace9-04fbebb7d4e2',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '6a3a2c40-ae4e-431e-8acb-bff232d80b30',
    'ADMIN',
    'Bacofoil® The Non-Stick 300mm x 20m',
    'bacofoil-the-non-stick-300mm-x-20m',
    '42B19',
    2.83,
    NULL,
    NULL,
    100,
    TRUE,
    '<p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">Ensure there are no sticky situations with Bacofoil<sup>®</sup>&nbsp;Non-Stick Kitchen Foil. With its unique BacoLift<sup>®</sup>&nbsp;Surface, even the most notorious culprits couldn’t stick to the foil if they tried. Not to mention with no need to use oil or butter it’s the healthier option too. There is even the added benefit of no washing up afterwards!</p><p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">Now the newly designed, easy to handle, ergonomic packaging, has a unique Easy-Cut System with curved blade to improve the cutting of the foil, guaranteeing a perfect cut every time, reducing waste!</p>',
    '300mm x 20m',
    'simple',
    'Bacofoil® The Non-Stick 300mm x 20m | Buy Online at Best Price',
    'Shop Bacofoil® The Non-Stick 300mm x 20m online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '6a3a2c40-ae4e-431e-8acb-bff232d80b30'
FROM "Category" c
WHERE c.slug = 'kitchen-cookware-accessories'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/98d169c35368815fc59406db27ded577.jpg',
    'PRODUCT',
    '6a3a2c40-ae4e-431e-8acb-bff232d80b30',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/d156881ae9f444b794ced1c1ade9272b.png',
    'PRODUCT',
    '6a3a2c40-ae4e-431e-8acb-bff232d80b30',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '03ff3e74-f3af-4fd9-8bf9-f0f50ade5571',
    'ADMIN',
    'Wham® Bam 36L H.Duty Box & Lid Black Recycled',
    'wham-bam-36l-h-duty-box-lid-black-recycled',
    '445080',
    6.31,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Manufactured from 100% recycled plastic. Resists high impact damage. Durable and strong, even in cold temperatures. The box has been strength tested to 380kg! Lid snaps into place and features holes to add tie-wraps for added security</span><br></p>',
    'Code: 445080
Dimensions: 59.50 x 40.00 x 21.50 cm
Weight: 2.5245 kg',
    'simple',
    'Wham® Bam 36L H.Duty Box & Lid Black Recycled | Buy Online at Best Price',
    'Shop Wham® Bam 36L H.Duty Box & Lid Black Recycled online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '03ff3e74-f3af-4fd9-8bf9-f0f50ade5571'
FROM "Category" c
WHERE c.slug = 'storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/963485613440da5e7fff16c48310361e.png',
    'PRODUCT',
    '03ff3e74-f3af-4fd9-8bf9-f0f50ade5571',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '102abc9e-596e-4051-a780-0dee5ba94821',
    'ADMIN',
    'Bacofoil® The Non-Stick Kitchen Foil Extra Wide 450mm x 5m',
    'bacofoil-the-non-stick-kitchen-foil-extra-wide-450mm-x-5m',
    '42B04',
    1.68,
    NULL,
    NULL,
    100,
    TRUE,
    '<p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">Ensure there are no sticky situations with Bacofoil<sup>®</sup>&nbsp;The Non-Stick Kitchen Foil with its unique BacoLift<sup>®</sup>&nbsp;Surface, even the most notorious culprits couldn’t stick to the foil if they tried.</p><p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">With no need to use oil or butter it’s the healthier option too. There’s even the added benefit that you don’t need to wash up the tray afterwards as the BacoLift<sup>®</sup>&nbsp;Surface ensures food won’t stick to the tray or the foil, leaving it looking like it should! Our Non-Stick Kitchen Foil Extra Wide will ensure you have enough Kitchen Foil to cover your larger baking trays and food for cooking.</p>',
    '450mm x 5m',
    'simple',
    'Bacofoil® The Non-Stick Kitchen Foil Extra Wide 450mm x 5m | Buy Online at Best Price',
    'Shop Bacofoil® The Non-Stick Kitchen Foil Extra Wide 450mm x 5m online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '102abc9e-596e-4051-a780-0dee5ba94821'
FROM "Category" c
WHERE c.slug = 'kitchen-cookware-accessories'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/e575e2f08920aea9deffb75ec9521310.png',
    'PRODUCT',
    '102abc9e-596e-4051-a780-0dee5ba94821',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '2d9c5d22-0826-46da-b9dc-9b6bc2062505',
    'ADMIN',
    'Eden Grid Cover Black',
    'eden-grid-cover-black',
    '10200',
    0.84,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Prevents leaf and debris blockages by covering outside drains.</span><br></p>',
    'Code: 10200
Dimensions: 33.00 x 30.00 x 8.00 cm
Weight: 0.267 kg',
    'simple',
    'Eden Grid Cover Black | Buy Online at Best Price',
    'Shop Eden Grid Cover Black online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '2d9c5d22-0826-46da-b9dc-9b6bc2062505'
FROM "Category" c
WHERE c.slug = 'pots-planters-accessories'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/79a65bdbfe1b9438773ebf73e6f5eebb.png',
    'PRODUCT',
    '2d9c5d22-0826-46da-b9dc-9b6bc2062505',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/7f8ab26a01a46a204d9067ba2bb64803.png',
    'PRODUCT',
    '2d9c5d22-0826-46da-b9dc-9b6bc2062505',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/ae9cec8972b97b97ba48c2cd163c6bba.png',
    'PRODUCT',
    '2d9c5d22-0826-46da-b9dc-9b6bc2062505',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/e598a5ab55887f293147084c0c23c4b4.png',
    'PRODUCT',
    '2d9c5d22-0826-46da-b9dc-9b6bc2062505',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/b1dc1efe0c056fe4f9a71960464e7140.jpg',
    'PRODUCT',
    '2d9c5d22-0826-46da-b9dc-9b6bc2062505',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/2c76e38cd0ee1aa603a3874014878dc7.jpg',
    'PRODUCT',
    '2d9c5d22-0826-46da-b9dc-9b6bc2062505',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230711/f46b98096ea6c6c70788e120e1d5544c.jpg',
    'PRODUCT',
    '2d9c5d22-0826-46da-b9dc-9b6bc2062505',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '752c5b69-9679-4d82-a758-f8987879488c',
    'ADMIN',
    '4.01 Wham® Box & Lid 3.5L Set of 4 Clear/Assorted',
    '4-01-wham-box-lid-3-5l-set-of-4-clear-assorted',
    '13109',
    7.73,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">High quality storage box with click on lid. Strong and durable with enhanced secure close-fitting lid. Dimensions shown are for the set of 4. Individual box dimensions: 27.5x18x10.5cm.</span><br></p>',
    'Code: 13109
Dimensions: 27.50 x 18.00 x 23.00 cm
Weight: 1.144 kg',
    'simple',
    '4.01 Wham® Box & Lid 3.5L Set of 4 Clear/Assorted | Buy Online at Best Price',
    'Shop 4.01 Wham® Box & Lid 3.5L Set of 4 Clear/Assorted online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '752c5b69-9679-4d82-a758-f8987879488c'
FROM "Category" c
WHERE c.slug = 'storage-containers-boxes'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/5c774c5fc4555a4cf25058f968416527.png',
    'PRODUCT',
    '752c5b69-9679-4d82-a758-f8987879488c',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/d555d549a6c78e2881121a0c0f41e857.png',
    'PRODUCT',
    '752c5b69-9679-4d82-a758-f8987879488c',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/4ccf9e2dfef1485d844a443df01f9fd1.png',
    'PRODUCT',
    '752c5b69-9679-4d82-a758-f8987879488c',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/e0da48895f4e7f30f2e834d5cf38c0b0.png',
    'PRODUCT',
    '752c5b69-9679-4d82-a758-f8987879488c',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/06630130ab38ff128e7756b6a275f60d.png',
    'PRODUCT',
    '752c5b69-9679-4d82-a758-f8987879488c',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/d51d02eeccef81640a93c56371bcc895.png',
    'PRODUCT',
    '752c5b69-9679-4d82-a758-f8987879488c',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '1c3f9fbe-f919-41d4-b78f-4e30a6a43438',
    'ADMIN',
    'Bacofoil® 2 in 1 Parchment & Foil 300mm x 5m',
    'bacofoil-2-in-1-parchment-foil-300mm-x-5m',
    '21B77',
    1.76,
    NULL,
    NULL,
    100,
    TRUE,
    '<p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">The Bacofoil<sup>®</sup>&nbsp;2 in 1 Parchment and Foil is designed to save time and make life easier in the kitchen.</p><p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">With the benefits of both foil and non-stick parchment, it combines the best of both worlds. Whilst the foil helps to insulate the ingredients and encourages heating throughout, the parchment protects the food and stops anything from sticking.</p>',
    'Bacofoil® 2 in 1 Parchment & Foil 300mm x 5m
',
    'simple',
    'Bacofoil® 2 in 1 Parchment & Foil 300mm x 5m | Buy Online at Best Price',
    'Shop Bacofoil® 2 in 1 Parchment & Foil 300mm x 5m online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '1c3f9fbe-f919-41d4-b78f-4e30a6a43438'
FROM "Category" c
WHERE c.slug = 'kitchen-cookware-accessories'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/7315f0ff2565db487936e405d7e41256.jpg',
    'PRODUCT',
    '1c3f9fbe-f919-41d4-b78f-4e30a6a43438',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/99e2d567e9e4ac735e94af889495fc1a.jpg',
    'PRODUCT',
    '1c3f9fbe-f919-41d4-b78f-4e30a6a43438',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '21570017-c8a1-42ca-b16b-b8c362dc03cc',
    'ADMIN',
    '5.01 Wham® Box & Lid 9L Set of 3 Clear/Assorted',
    '5-01-wham-box-lid-9l-set-of-3-clear-assorted',
    '13129',
    8.28,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">High quality storage box with click on lid. Strong and durable with enhanced secure close-fitting lid. The design of the box maximises internal storage space, whilst still allowing the boxes to nest together when not in use, to save space. Handy set of 3.</span><br></p>',
    'Code: 13129
Dimensions: 38.00 x 23.00 x 23.50 cm
Weight: 1.689 kg',
    'simple',
    '5.01 Wham® Box & Lid 9L Set of 3 Clear/Assorted | Buy Online at Best Price',
    'Shop 5.01 Wham® Box & Lid 9L Set of 3 Clear/Assorted online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '21570017-c8a1-42ca-b16b-b8c362dc03cc'
FROM "Category" c
WHERE c.slug = 'storage-containers-boxes'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/b924f17360612e2aa6ef993b5fce0323.png',
    'PRODUCT',
    '21570017-c8a1-42ca-b16b-b8c362dc03cc',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/7b587bd2d47be079c3710bd68356c10b.png',
    'PRODUCT',
    '21570017-c8a1-42ca-b16b-b8c362dc03cc',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/16a97bba3a833e46897dba2c6b94dc46.png',
    'PRODUCT',
    '21570017-c8a1-42ca-b16b-b8c362dc03cc',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/3b79daa54a837330706f1a018a0ed185.png',
    'PRODUCT',
    '21570017-c8a1-42ca-b16b-b8c362dc03cc',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/fed06e254882ea6a9b4d22e99bbd416b.png',
    'PRODUCT',
    '21570017-c8a1-42ca-b16b-b8c362dc03cc',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    'd591ee6a-8025-4e59-b9b5-d6ddcb9074e7',
    'ADMIN',
    'Bacofoil® Turkey Roasting Tray',
    'bacofoil-turkey-roasting-tray',
    '85B05',
    0.65,
    NULL,
    NULL,
    100,
    TRUE,
    '<p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">For the perfect Christmas Turkey, Bacofoil<sup>®</sup>&nbsp;The Turkey Roasting Tray provides a fuss free cooking solution.</p><p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">Robust and easy to use it holds in all the juices, and better still there’s no need to wash up afterwards. Use alongside Bacofoil<sup>®</sup>&nbsp;The Turkey Roasting Foil to retain the flavour of the food.</p>',
    'For the perfect Christmas Turkey, Bacofoil® The Turkey Roasting Tray provides a fuss free cooking solution.
',
    'simple',
    'Bacofoil® Turkey Roasting Tray | Buy Online at Best Price',
    'Shop Bacofoil® Turkey Roasting Tray online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, 'd591ee6a-8025-4e59-b9b5-d6ddcb9074e7'
FROM "Category" c
WHERE c.slug = 'kitchen-cookware-accessories'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230711/a3ec59747284a053b1662c1cd5a081a0.jpg',
    'PRODUCT',
    'd591ee6a-8025-4e59-b9b5-d6ddcb9074e7',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '25bb67b1-35aa-4817-8527-bbd7a82c0f66',
    'ADMIN',
    'Wham Bam 45L H.Duty Box & Lid Black Recycled',
    'wham-bam-45l-h-duty-box-lid-black-recycled',
    '445140',
    6.78,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Manufactured from 100% recycled plastic. Resists high impact damage. Durable and strong, even in cold temperatures. The box has been strength tested to 380kg! Lid snaps into place and features holes to add tie-wraps for added security.</span><br></p>',
    'Code: 445140
Dimensions: 49.00 x 39.50 x 32.00 cm
Weight: 2.4825 kg',
    'simple',
    'Wham Bam 45L H.Duty Box & Lid Black Recycled | Buy Online at Best Price',
    'Shop Wham Bam 45L H.Duty Box & Lid Black Recycled online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '25bb67b1-35aa-4817-8527-bbd7a82c0f66'
FROM "Category" c
WHERE c.slug = 'storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/491824fa42c24c35d6bffbb15c575c8d.png',
    'PRODUCT',
    '25bb67b1-35aa-4817-8527-bbd7a82c0f66',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/56c88ef1130b4c8fe6e032a5fbc83649.png',
    'PRODUCT',
    '25bb67b1-35aa-4817-8527-bbd7a82c0f66',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '7d37ac52-4427-4192-8772-d61e3a06f8ed',
    'ADMIN',
    'Studio Basket 4.02 Rectangular Cool Grey',
    'studio-basket-4-02-rectangular-cool-grey',
    '25577',
    1.32,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Sleek and versatile, suited to displaying your craft accessories, bathroom toiletries, makeup, pantry goods, cleaning and laundry products, stationery or toys. The handle aids easy access to slide the baskets when stored on shelves. Approx. 3.9L.</span><br></p>',
    'Code: 25577
Dimensions: 17.00 x 25.00 x 11.00 cm
Weight: 0.267 kg',
    'simple',
    'Studio Basket 4.02 Rectangular Cool Grey | Buy Online at Best Price',
    'Shop Studio Basket 4.02 Rectangular Cool Grey online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '7d37ac52-4427-4192-8772-d61e3a06f8ed'
FROM "Category" c
WHERE c.slug = 'storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230711/5389e96f78ab123b08a0f14f643375c8.jpg',
    'PRODUCT',
    '7d37ac52-4427-4192-8772-d61e3a06f8ed',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/443dd5cc5aa5e4196a1a7662375e95d9.png',
    'PRODUCT',
    '7d37ac52-4427-4192-8772-d61e3a06f8ed',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/0db7c0ec8c1934551c49a284d6f4f33f.png',
    'PRODUCT',
    '7d37ac52-4427-4192-8772-d61e3a06f8ed',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    'd7001e68-9102-4ec2-bf4e-ccd87a6043ed',
    'ADMIN',
    'Bacofoil® Flavour Seal Roasting Bags (8) MED',
    'bacofoil-flavour-seal-roasting-bags-8-med',
    '85B27',
    0.65,
    NULL,
    NULL,
    100,
    TRUE,
    '<p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">Bacofoil<sup>®</sup>&nbsp;Flavour Seal Roasting Bags are the perfect way to help create great tasting Roasts without the fuss!</p><p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">Easy to use, they’re great for all meats and work in ovens and microwaves. Bacofoil<sup>®</sup>&nbsp;Flavour Seal Roasting bags seal in flavours and juices, keeping food from drying out and come with easy to use tie fastenings.</p>',
    'Seals in flavour & Prevents food from drying out
Nylon bag Ties included
Saves on washing up
Bacofoil® Flavour Seal Roasting Bags are the perfect way to help create great tasting Roasts wi',
    'simple',
    'Bacofoil® Flavour Seal Roasting Bags (8) MED | Buy Online at Best Price',
    'Shop Bacofoil® Flavour Seal Roasting Bags (8) MED online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, 'd7001e68-9102-4ec2-bf4e-ccd87a6043ed'
FROM "Category" c
WHERE c.slug = 'kitchen-cookware-accessories'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/ea0841d982b6101ad131eabc5ead4447.jpg',
    'PRODUCT',
    'd7001e68-9102-4ec2-bf4e-ccd87a6043ed',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/922a7f9cba8cea58f7d92333a84d02ae.jpg',
    'PRODUCT',
    'd7001e68-9102-4ec2-bf4e-ccd87a6043ed',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '94020443-f624-439c-9d8a-f346c54bc9cc',
    'ADMIN',
    'Studio Basket 4.02 Rectangular Ice White',
    'studio-basket-4-02-rectangular-ice-white',
    '25575',
    1.32,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Sleek and versatile, suited to displaying your craft accessories, bathroom toiletries, makeup, pantry goods, cleaning and laundry products, stationery or toys. The handle aids easy access to slide the baskets when stored on shelves. Approx. 3.9L.</span><br></p>',
    'Code: 25575
Dimensions: 17.00 x 25.00 x 11.00 cm
Weight: 0.267 kg',
    'simple',
    'Studio Basket 4.02 Rectangular Ice White | Buy Online at Best Price',
    'Shop Studio Basket 4.02 Rectangular Ice White online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '94020443-f624-439c-9d8a-f346c54bc9cc'
FROM "Category" c
WHERE c.slug = 'storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230711/fc51db08186c24c2fbf49273385f0311.jpg',
    'PRODUCT',
    '94020443-f624-439c-9d8a-f346c54bc9cc',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/0cf1960e1ef015d09ec23fabae0e1464.jpg',
    'PRODUCT',
    '94020443-f624-439c-9d8a-f346c54bc9cc',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/4f6deb9e59eef5e972f15dc93968d209.jpg',
    'PRODUCT',
    '94020443-f624-439c-9d8a-f346c54bc9cc',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/3ecf55731e0cef39bc6bc0c5a1b357ec.jpg',
    'PRODUCT',
    '94020443-f624-439c-9d8a-f346c54bc9cc',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/5722975f5d4de1dec403a1cf6e05b662.jpg',
    'PRODUCT',
    '94020443-f624-439c-9d8a-f346c54bc9cc',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/2b91029f0398c0cb3cc83da98e423f64.jpg',
    'PRODUCT',
    '94020443-f624-439c-9d8a-f346c54bc9cc',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    'de552ab1-c779-4003-869f-0e2c331d0232',
    'ADMIN',
    'Bacofoil® Flavour Seal Roasting Bags (5) LGE',
    'bacofoil-flavour-seal-roasting-bags-5-lge',
    '86B02',
    0.65,
    NULL,
    NULL,
    100,
    TRUE,
    '<p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">Bacofoil<sup>®</sup>&nbsp;Flavour Seal Roasting Bags are the perfect way to help create great tasting Roasts without the fuss!</p><p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">Easy to use, they’re great for all meats and work in ovens and microwaves. Bacofoil<sup>®</sup>&nbsp;Flavour Seal Roasting bags seal in flavours and juices, keeping food from drying out and come with easy to use tie fastenings.</p>',
    'Bacofoil® Flavour Seal Roasting Bags are the perfect way to help create great tasting Roasts without the fuss!
350mm x 430mm
',
    'simple',
    'Bacofoil® Flavour Seal Roasting Bags (5) LGE | Buy Online at Best Price',
    'Shop Bacofoil® Flavour Seal Roasting Bags (5) LGE online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, 'de552ab1-c779-4003-869f-0e2c331d0232'
FROM "Category" c
WHERE c.slug = 'kitchen-cookware-accessories'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230711/6161875afab5db7ef786c163f0303418.jpg',
    'PRODUCT',
    'de552ab1-c779-4003-869f-0e2c331d0232',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '5199305d-9f32-4791-b1cc-8c16de2020d4',
    'ADMIN',
    'Studio Basket 5.02 Rectangular Cool Grey',
    'studio-basket-5-02-rectangular-cool-grey',
    '25602',
    2.48,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Sleek and versatile, suited to displaying your craft accessories, bathroom toiletries, makeup, pantry goods, cleaning and laundry products, stationery or toys. The handle aids easy access to slide the baskets when stored on shelves. Approx. 11.5L.</span><br></p>',
    'Code: 25602
Dimensions: 26.00 x 35.00 x 15.00 cm
Weight: 0.642 kg',
    'simple',
    'Studio Basket 5.02 Rectangular Cool Grey | Buy Online at Best Price',
    'Shop Studio Basket 5.02 Rectangular Cool Grey online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '5199305d-9f32-4791-b1cc-8c16de2020d4'
FROM "Category" c
WHERE c.slug = 'storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/06071fa56522c204a72b4f0faca60bf9.png',
    'PRODUCT',
    '5199305d-9f32-4791-b1cc-8c16de2020d4',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/0db7c0ec8c1934551c49a284d6f4f33f.png',
    'PRODUCT',
    '5199305d-9f32-4791-b1cc-8c16de2020d4',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/6e3b9a2e1b28a10734dd991fec5d08c3.png',
    'PRODUCT',
    '5199305d-9f32-4791-b1cc-8c16de2020d4',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/8f2a6daa670981fedb30d766c76cc83e.jpg',
    'PRODUCT',
    '5199305d-9f32-4791-b1cc-8c16de2020d4',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/4f6deb9e59eef5e972f15dc93968d209.jpg',
    'PRODUCT',
    '5199305d-9f32-4791-b1cc-8c16de2020d4',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    'c353d778-ef65-44ac-9e35-17b72dfa6fda',
    'ADMIN',
    'Studio Basket 5.02 Rectangular Ice White',
    'studio-basket-5-02-rectangular-ice-white',
    '25600',
    2.48,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Sleek and versatile, suited to displaying your craft accessories, bathroom toiletries, makeup, pantry goods, cleaning and laundry products, stationery or toys. The handle aids easy access to slide the baskets when stored on shelves. Approx. 11.5L.</span><br></p>',
    'Code: 25600
Dimensions: 26.00 x 35.00 x 15.00 cm
Weight: 0.642 kg',
    'simple',
    'Studio Basket 5.02 Rectangular Ice White | Buy Online at Best Price',
    'Shop Studio Basket 5.02 Rectangular Ice White online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, 'c353d778-ef65-44ac-9e35-17b72dfa6fda'
FROM "Category" c
WHERE c.slug = 'storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/dec7e9ebe7464484b237b330ff29a162.png',
    'PRODUCT',
    'c353d778-ef65-44ac-9e35-17b72dfa6fda',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/14251e2499d700d338d38e0cff73e972.png',
    'PRODUCT',
    'c353d778-ef65-44ac-9e35-17b72dfa6fda',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/be2590d96ef4f4cf936c60fb5fb01931.jpg',
    'PRODUCT',
    'c353d778-ef65-44ac-9e35-17b72dfa6fda',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/5c24f5aa610b05b2a9f2fd03de5798e8.jpg',
    'PRODUCT',
    'c353d778-ef65-44ac-9e35-17b72dfa6fda',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/0cf1960e1ef015d09ec23fabae0e1464.jpg',
    'PRODUCT',
    'c353d778-ef65-44ac-9e35-17b72dfa6fda',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/bbac9203e77fc40bb77b1072acbb645c.jpg',
    'PRODUCT',
    'c353d778-ef65-44ac-9e35-17b72dfa6fda',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/1444399f06cad9813249333d9f02e0e7.jpg',
    'PRODUCT',
    'c353d778-ef65-44ac-9e35-17b72dfa6fda',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/685fffee4fc6c8c3ea2eb01263932fc4.jpg',
    'PRODUCT',
    'c353d778-ef65-44ac-9e35-17b72dfa6fda',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '5821ae3a-b6da-447b-a3a7-5c2f9f372dfd',
    'ADMIN',
    'Bacofoil Zipper All Purpose Bags (15 x 1Ltr)',
    'bacofoil-zipper-all-purpose-bags-15-x-1ltr',
    '6776440',
    1.26,
    NULL,
    NULL,
    100,
    TRUE,
    '<h5 style="color: rgb(0, 27, 105); font-size: calc(1rem + (1vw - 3.2px) * 0.25); line-height: 1.6; margin-right: auto; margin-bottom: 20px; margin-left: auto; width: auto; font-family: ff-meta-web-pro, sans-serif; max-width: none !important;">Resealable &amp; Reusable<br>Made with 70% Recycled Resources<br>Versatile, Leak-proof and Tear-resistant</h5><p style="color: rgb(0, 27, 105); font-size: medium; line-height: 1.5; font-family: ff-meta-web-pro, sans-serif;">Bacofoil<sup>®</sup>&nbsp;ZIPPER<sup>®</sup>&nbsp;All-Purpose Bags with secure zip tight seal are incredibly versatile, easy to use, and are now dishwasher safe and made with 70% recycled resources! Perfect for preserving leftovers, prepping healthy meals, batch cooking and storing general bits and bobs. They’re the perfect all-rounder for at home or on the go!</p>',
    'Boss it with Bacofoil® Zipper® All Purpose Bags Whether you’re batch cooking family dinners, prepping healthy snacks, saving leftovers for tomorrow’s work lunch, or simply storing away those ',
    'simple',
    'Bacofoil Zipper All Purpose Bags (15 x 1Ltr) | Buy Online at Best Price',
    'Shop Bacofoil Zipper All Purpose Bags (15 x 1Ltr) online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '5821ae3a-b6da-447b-a3a7-5c2f9f372dfd'
FROM "Category" c
WHERE c.slug = 'cling-film-foil-food-bags'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/3d860b22cb8834c779fad103bb021f5d.jpg',
    'PRODUCT',
    '5821ae3a-b6da-447b-a3a7-5c2f9f372dfd',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/473ac1244c25f0b61c7c1edca92b8992.jpg',
    'PRODUCT',
    '5821ae3a-b6da-447b-a3a7-5c2f9f372dfd',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    'c75b7931-4c1d-4b08-a33b-5d6667a661ac',
    'ADMIN',
    'Studio Basket 5.01 Rectangular Cool Grey',
    'studio-basket-5-01-rectangular-cool-grey',
    '25652',
    1.89,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">leek and versatile, suited to displaying your craft accessories, bathroom toiletries, makeup, pantry goods, cleaning and laundry products, stationery or toys. The handle aids easy access to slide the baskets when stored on shelves. Approx. 6L.</span><br></p>',
    'Code: 25652
Dimensions: 26.00 x 35.00 x 8.00 cm
Weight: 0.453 kg',
    'simple',
    'Studio Basket 5.01 Rectangular Cool Grey | Buy Online at Best Price',
    'Shop Studio Basket 5.01 Rectangular Cool Grey online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, 'c75b7931-4c1d-4b08-a33b-5d6667a661ac'
FROM "Category" c
WHERE c.slug = 'storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230711/2357b1490360d3a16523a3bfc0aedcf2.jpg',
    'PRODUCT',
    'c75b7931-4c1d-4b08-a33b-5d6667a661ac',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/443dd5cc5aa5e4196a1a7662375e95d9.png',
    'PRODUCT',
    'c75b7931-4c1d-4b08-a33b-5d6667a661ac',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/0b35a7637f4ede89239be78e46ca6e68.png',
    'PRODUCT',
    'c75b7931-4c1d-4b08-a33b-5d6667a661ac',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/af4ac2b1d33a573d46fc90698d392cc1.jpg',
    'PRODUCT',
    'c75b7931-4c1d-4b08-a33b-5d6667a661ac',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '09a4eae2-2a6a-4249-8a68-6f7d152846d3',
    'ADMIN',
    'Bacofoil® Zipper® All Purpose Bags 12 x 3Ltr',
    'bacofoil-zipper-all-purpose-bags-12-x-3ltr',
    '6776436',
    1.58,
    NULL,
    NULL,
    100,
    TRUE,
    '<h5 style="color: rgb(0, 27, 105); font-size: calc(1rem + (1vw - 3.2px) * 0.25); line-height: 1.6; margin-right: auto; margin-bottom: 20px; margin-left: auto; width: auto; font-family: ff-meta-web-pro, sans-serif; max-width: none !important;">Resealable &amp; Reusable<br>Made with 70% Recycled Resources<br>Versatile, Leak-proof and Tear-resistant</h5><p style="color: rgb(0, 27, 105); font-size: medium; line-height: 1.5; font-family: ff-meta-web-pro, sans-serif;">Bacofoil<sup>®</sup>&nbsp;ZIPPER<sup>®</sup>&nbsp;All-Purpose Bags with secure zip tight seal are incredibly versatile, easy to use, and are now dishwasher safe and made with 70% recycled resources! Perfect for preserving leftovers, prepping healthy meals, batch cooking and storing general bits and bobs. They’re the perfect all-rounder for at home or on the go!</p><p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">Boss it with Bacofoil<sup>®</sup>&nbsp;Zipper<sup>®</sup>&nbsp;All Purpose Bags Whether you’re batch cooking family dinners, prepping healthy snacks, saving leftovers for tomorrow’s work lunch, or simply storing away those niggly little items, our reusable Zipper<sup>®</sup>&nbsp;bags are the perfect household essential to help you get ahead.</p><p style="color: rgb(112, 112, 112); font-size: medium; line-height: 1.5; width: auto; font-family: ff-meta-web-pro, sans-serif;">Incredibly versatile and easy to use, Bacofoil<sup>®</sup>&nbsp;ZIPPER<sup>®</sup>&nbsp;All-Purpose Bags keep the freshness locked in. With a satisfying zip you can hear to secure your food, and tear-resistant film, there’s no need to worry about leaky disasters on the way to school, work or in the fridge / freezer. They even come with a handy stand-alone base, so you can easily fill them up with delicious homemade soups or other liquids. And best of all, our high quality, sturdy bags are&nbsp;<strong>now made with 70% recycled resources (bringing us closer to our goal of using only recycled or renewable raw materials in our products by 2025) and are dishwasher safe</strong>, so you can reuse them again and again!</p>',
    'Boss it with Bacofoil® Zipper® All Purpose Bags Whether you’re batch cooking family dinners, prepping healthy snacks, saving leftovers for tomorrow’s work lunch, or simply storing away those ',
    'simple',
    'Bacofoil® Zipper® All Purpose Bags 12 x 3Ltr | Buy Online at Best Price',
    'Shop Bacofoil® Zipper® All Purpose Bags 12 x 3Ltr online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '09a4eae2-2a6a-4249-8a68-6f7d152846d3'
FROM "Category" c
WHERE c.slug = 'storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/3d860b22cb8834c779fad103bb021f5d.jpg',
    'PRODUCT',
    '09a4eae2-2a6a-4249-8a68-6f7d152846d3',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/473ac1244c25f0b61c7c1edca92b8992.jpg',
    'PRODUCT',
    '09a4eae2-2a6a-4249-8a68-6f7d152846d3',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/f97270bd68528d6ca626095494d594c0.png',
    'PRODUCT',
    '09a4eae2-2a6a-4249-8a68-6f7d152846d3',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '272d1c7b-9698-4ee9-86a1-d500e71a42af',
    'ADMIN',
    'Studio Basket 5.01 Rectangular Ice White',
    'studio-basket-5-01-rectangular-ice-white',
    '25650',
    1.89,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Sleek and versatile, suited to displaying your craft accessories, bathroom toiletries, makeup, pantry goods, cleaning and laundry products, stationery or toys. The handle aids easy access to slide the baskets when stored on shelves. Approx. 6L.</span><br></p>',
    'Code: 25650
Dimensions: 26.00 x 35.00 x 8.00 cm
Weight: 0.453 kg',
    'simple',
    'Studio Basket 5.01 Rectangular Ice White | Buy Online at Best Price',
    'Shop Studio Basket 5.01 Rectangular Ice White online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '272d1c7b-9698-4ee9-86a1-d500e71a42af'
FROM "Category" c
WHERE c.slug = 'storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230711/452db9db7db16099abb76c613b797f68.jpg',
    'PRODUCT',
    '272d1c7b-9698-4ee9-86a1-d500e71a42af',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/693607eb3e5b0ce795515045266a225e.jpg',
    'PRODUCT',
    '272d1c7b-9698-4ee9-86a1-d500e71a42af',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/46d71dd4284df48e4b7c479609a47c55.png',
    'PRODUCT',
    '272d1c7b-9698-4ee9-86a1-d500e71a42af',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/443dd5cc5aa5e4196a1a7662375e95d9.png',
    'PRODUCT',
    '272d1c7b-9698-4ee9-86a1-d500e71a42af',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/82b5bf8457167a2ed26942faae3ae7cf.png',
    'PRODUCT',
    '272d1c7b-9698-4ee9-86a1-d500e71a42af',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/704a6716bbeb66f73293c4c11c779272.png',
    'PRODUCT',
    '272d1c7b-9698-4ee9-86a1-d500e71a42af',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/715205caf6134b36770487a187c4c1a8.jpg',
    'PRODUCT',
    '272d1c7b-9698-4ee9-86a1-d500e71a42af',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '1443e3a8-9a1a-427c-9249-3408e6fc6469',
    'ADMIN',
    'Wham Essentials 32cm Oven Tray 0.29 Black/Black',
    'wham-essentials-32cm-oven-tray-0-29-black-black',
    '56026',
    0.98,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Non-stick Whitford Skandia coated 0.3 gauge steel. High corrosion resistant. Oven safe to 230 degrees. Dishwasher and freezer safe.</span><br></p>',
    'Code: 56026
Dimensions: 32.00 x 23.00 x 1.50 cm
Weight: 0.2213 kg',
    'simple',
    'Wham Essentials 32cm Oven Tray 0.29 Black/Black | Buy Online at Best Price',
    'Shop Wham Essentials 32cm Oven Tray 0.29 Black/Black online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '1443e3a8-9a1a-427c-9249-3408e6fc6469'
FROM "Category" c
WHERE c.slug = 'kitchen-cookware-accessories'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/25356bcbb8b239bdb41e3ebd3cf2b92d.png',
    'PRODUCT',
    '1443e3a8-9a1a-427c-9249-3408e6fc6469',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/6877ec2aa4eb57d4e9fd09ad39711399.png',
    'PRODUCT',
    '1443e3a8-9a1a-427c-9249-3408e6fc6469',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/64597c56e22d293949dcf9fb67bdf6d5.jpg',
    'PRODUCT',
    '1443e3a8-9a1a-427c-9249-3408e6fc6469',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/d5eb3c2709f8b6116f619b18ed5674c8.jpg',
    'PRODUCT',
    '1443e3a8-9a1a-427c-9249-3408e6fc6469',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    'becaa3e4-0dfb-40f2-abe2-e49b69acce00',
    'ADMIN',
    'Caterwrap Cling Film 300 mm x 300 m Cutter Box',
    'caterwrap-cling-film-300-mm-x-300-m-cutter-box',
    '32C08',
    4.24,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">This cling film is a perfect way to prevent the cultivation of bacteria and to retain freshness. The cling film comes in a specially designed cutter box that features a serrated edge, perfect for cutting through the film and measuring the right quantity. Designed to be long-lasting, this film can be pulled taut without ripping or tearing, making it perfect for covering a range of items. This cling film measures 300 mm x 300 m.</span><br></p>',
    'nan',
    'simple',
    'Caterwrap Cling Film 300 mm x 300 m Cutter Box | Buy Online at Best Price',
    'Shop Caterwrap Cling Film 300 mm x 300 m Cutter Box online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, 'becaa3e4-0dfb-40f2-abe2-e49b69acce00'
FROM "Category" c
WHERE c.slug = 'cling-film-foil-food-bags'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/0fbaffce6129ff8f078e0bfa1ed5c6bd.jpg',
    'PRODUCT',
    'becaa3e4-0dfb-40f2-abe2-e49b69acce00',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '88cc6d78-9488-4d4b-ad01-d90ac3215482',
    'ADMIN',
    'Casa Large Cutlery Tray Silver',
    'casa-large-cutlery-tray-silver',
    '11300',
    1.73,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Large cutlery organiser tray with seven compartments. Durable yet lightweight and easy to clean with a high gloss finish.</span><br></p>',
    'Code: 11300
Dimensions: 42.00 x 37.00 x 5.00 cm
Weight: 0.3895 kg',
    'simple',
    'Casa Large Cutlery Tray Silver | Buy Online at Best Price',
    'Shop Casa Large Cutlery Tray Silver online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '88cc6d78-9488-4d4b-ad01-d90ac3215482'
FROM "Category" c
WHERE c.slug = 'kitchen-storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/ce135cdf670552d749e5f701a646321d.png',
    'PRODUCT',
    '88cc6d78-9488-4d4b-ad01-d90ac3215482',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/97406d4e64e3d55d5c17ef19195dc9da.png',
    'PRODUCT',
    '88cc6d78-9488-4d4b-ad01-d90ac3215482',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/718c9702914e85a2fad0ac86ab243ade.jpg',
    'PRODUCT',
    '88cc6d78-9488-4d4b-ad01-d90ac3215482',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '21e0bc4a-90c3-4226-99ff-19ba0576aeb9',
    'ADMIN',
    'Caterwrap PVC Low Migration Cling Film 45cm x 300m Cutterbox-2PK',
    'caterwrap-pvc-low-migration-cling-film-45cm-x-300m-cutterbox-2pk',
    '32C09',
    6.15,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">This cling film is a perfect way to prevent the cultivation of bacteria and to retain freshness. The cling film comes in a specially designed cutter box that features a serrated edge, perfect for cutting through the film and measuring the right quantity. Designed to be long-lasting, this film can be pulled taut without ripping or tearing, making it perfect for covering a range of items. This cling film measures&nbsp;</span><span style="text-align: var(--bs-body-text-align);"><font color="#333333" face="Amazon Ember, Arial, sans-serif" size="2">45cm x 300m.</font></span><br></p>',
    'nan',
    'simple',
    'Caterwrap PVC Low Migration Cling Film 45cm x 300m Cutterbox-2PK | Buy Online at Best Price',
    'Shop Caterwrap PVC Low Migration Cling Film 45cm x 300m Cutterbox-2PK online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '21e0bc4a-90c3-4226-99ff-19ba0576aeb9'
FROM "Category" c
WHERE c.slug = 'cling-film-foil-food-bags'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230711/caf94cdabeee19464957252836c1ce8d.jpg',
    'PRODUCT',
    '21e0bc4a-90c3-4226-99ff-19ba0576aeb9',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230711/0893ef85a4baffd8e6cdf3043da560fe.jpg',
    'PRODUCT',
    '21e0bc4a-90c3-4226-99ff-19ba0576aeb9',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '97e1e8f5-2fee-4296-bedd-7ce087f9e314',
    'ADMIN',
    'Casa Large Sink Tidy Silver',
    'casa-large-sink-tidy-silver',
    '11290',
    1.34,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Ideal for tidying away sponges, cloths and scourers. 3 Compartments with drainage holes.</span><br></p>',
    'Code: 11290
Dimensions: 25.00 x 20.00 x 15.00 cm
Weight: 0.254 kg',
    'simple',
    'Casa Large Sink Tidy Silver | Buy Online at Best Price',
    'Shop Casa Large Sink Tidy Silver online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '97e1e8f5-2fee-4296-bedd-7ce087f9e314'
FROM "Category" c
WHERE c.slug = 'kitchen-storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/e64cd4f6560f54204bb8c0687d4a8223.png',
    'PRODUCT',
    '97e1e8f5-2fee-4296-bedd-7ce087f9e314',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/1850cd20d8069fd67492a993fdde9cbf.png',
    'PRODUCT',
    '97e1e8f5-2fee-4296-bedd-7ce087f9e314',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/c8efcf69be35f308cf93a8f5cc758bfb.png',
    'PRODUCT',
    '97e1e8f5-2fee-4296-bedd-7ce087f9e314',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/a39c1db6bda85b5d620aaaacf20b5696.jpg',
    'PRODUCT',
    '97e1e8f5-2fee-4296-bedd-7ce087f9e314',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '48dd61d6-7ca1-41df-97ac-3816b4375d66',
    'ADMIN',
    'Cuisine 5L Cereal Dispenser Clear/Ice White',
    'cuisine-5l-cereal-dispenser-clear-ice-white',
    '12396',
    1.73,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Good quality and hardwearing food storage dispenser. Base is clear to view contents easily. Dishwasher safe and BPA free. Ideal for storing dry foods such as cereals, pasta and rice.</span><br></p>',
    'Code: 12396
Dimensions: 28.50 x 12.50 x 30.50 cm
Weight: 0.349 kg',
    'simple',
    'Cuisine 5L Cereal Dispenser Clear/Ice White | Buy Online at Best Price',
    'Shop Cuisine 5L Cereal Dispenser Clear/Ice White online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '48dd61d6-7ca1-41df-97ac-3816b4375d66'
FROM "Category" c
WHERE c.slug = 'kitchen-storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/b4c4f09d76c38224ab239cffcf6a367c.png',
    'PRODUCT',
    '48dd61d6-7ca1-41df-97ac-3816b4375d66',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/c070e794d10942db1d3d823cae4d34f8.jpg',
    'PRODUCT',
    '48dd61d6-7ca1-41df-97ac-3816b4375d66',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '24430df5-cbee-4246-9d69-ea5a33d3f41c',
    'ADMIN',
    'Caterwrap Aluminium Catering Foil Catering Quality Strong 14Mu 300mm x 75m',
    'caterwrap-aluminium-catering-foil-catering-quality-strong-14mu-300mm-x-75m',
    '23C04',
    5.65,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">Catering Quality Caterwrap Aluminium Catering Foil 22C23 Aluminium foil cutterbox heavy duty 30cm x 75m All Caterwrap aluminium foil comes in a tamper-proof robust carton to prevent contamination and to ensure ease of dispensing.</span></p><ul class="a-unordered-list a-vertical a-spacing-mini" style="margin-right: 0px; margin-bottom: 0px; margin-left: 18px; color: rgb(15, 17, 17); padding: 0px; font-family: &quot;Amazon Ember&quot;, Arial, sans-serif;"><li class="a-spacing-mini" style="list-style: disc; overflow-wrap: break-word; margin: 0px;"><span class="a-list-item">Caterwrap Aluminium Catering Foil Size : 300mm x 75m.</span></li><li class="a-spacing-mini" style="list-style: disc; overflow-wrap: break-word; margin: 0px;"><span class="a-list-item">Thickness : 14Mu.</span></li><li class="a-spacing-mini" style="list-style: disc; overflow-wrap: break-word; margin: 0px;"><span class="a-list-item">Can be used for Roasting, wrapping and storing and freezing food.</span></li><li class="a-spacing-mini" style="list-style: disc; overflow-wrap: break-word; margin: 0px;"><span class="a-list-item">Wrapping food in foil keeps it fresh and allows for greater flexibility .</span></li><li class="a-spacing-mini" style="list-style: disc; overflow-wrap: break-word; margin: 0px;"><span class="a-list-item">Dispenser box is robust carton with cutting edge.</span></li></ul><p><br></p>',
    'nan',
    'simple',
    'Caterwrap Aluminium Catering Foil Catering Quality Strong 14Mu 300mm x 75m | Buy Online at Best Price',
    'Shop Caterwrap Aluminium Catering Foil Catering Quality Strong 14Mu 300mm x 75m online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '24430df5-cbee-4246-9d69-ea5a33d3f41c'
FROM "Category" c
WHERE c.slug = 'cling-film-foil-food-bags'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230711/ddafc98510494fd15cc4c7d49baee104.jpg',
    'PRODUCT',
    '24430df5-cbee-4246-9d69-ea5a33d3f41c',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230710/1d86d6c03201d69d7aa919bd2c4f9677.jpg',
    'PRODUCT',
    '24430df5-cbee-4246-9d69-ea5a33d3f41c',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '58f1c1b9-1909-48b2-b11d-8fe1a52e3d70',
    'ADMIN',
    'Everyday Set of 4 Food Boxes 1Litre Clear/Assorted',
    'everyday-set-of-4-food-boxes-1litre-clear-assorted',
    '35800',
    1.64,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">Set of 4 reusable plastic food box containers. Ideal for lunchboxes, storage, picnics and reheating. Dishwasher, freezer and microwave safe. BPA free. Each box is 1L and measures 19x14x5.5cm.</span><br></p>',
    'Code: 35800
Dimensions: 19.00 x 14.00 x 9.50 cm
Weight: 0.292 kg',
    'simple',
    'Everyday Set of 4 Food Boxes 1Litre Clear/Assorted | Buy Online at Best Price',
    'Shop Everyday Set of 4 Food Boxes 1Litre Clear/Assorted online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '58f1c1b9-1909-48b2-b11d-8fe1a52e3d70'
FROM "Category" c
WHERE c.slug = 'kitchen-storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/15e112b7fcc5173fe0564abef8901e4e.png',
    'PRODUCT',
    '58f1c1b9-1909-48b2-b11d-8fe1a52e3d70',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/06fb9d867025786e52addfc2fff7fe8a.png',
    'PRODUCT',
    '58f1c1b9-1909-48b2-b11d-8fe1a52e3d70',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/d89a174291638a3b01c9eba6a3892ad7.png',
    'PRODUCT',
    '58f1c1b9-1909-48b2-b11d-8fe1a52e3d70',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '0288c10a-a760-40ef-a183-f271d72746bd',
    'ADMIN',
    '450mm x 75m Aluminium Kitchen Catering Foil Roll - Oven Roast Baking Food Wrap',
    '450mm-x-75m-aluminium-kitchen-catering-foil-roll-oven-roast-baking-food-wrap',
    '23C05',
    8.16,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">75 metre roll of 450mm wide aluminium kitchen foil. Suitable for covering meat, poultry and fish when roasting or cooking. Also ideal for lining grill pans, wrapping baked potatoes and covering steam puddings.</span></p><ul class="a-unordered-list a-vertical a-spacing-mini" style="margin-right: 0px; margin-bottom: 0px; margin-left: 18px; color: rgb(15, 17, 17); padding: 0px; font-family: &quot;Amazon Ember&quot;, Arial, sans-serif;"><li class="a-spacing-mini" style="list-style: disc; overflow-wrap: break-word; margin: 0px;"><span class="a-list-item">75 metre roll of 450mm wide aluminium kitchen foil.</span></li><li class="a-spacing-mini" style="list-style: disc; overflow-wrap: break-word; margin: 0px;"><span class="a-list-item">Suitable for covering meat, poultry and fish when roasting or cooking.</span></li><li class="a-spacing-mini" style="list-style: disc; overflow-wrap: break-word; margin: 0px;"><span class="a-list-item">Also ideal for lining grill pans, wrapping baked potatoes and covering steam puddings.</span></li><li class="a-spacing-mini" style="list-style: disc; overflow-wrap: break-word; margin: 0px;"><span class="a-list-item">Supplied in box which is also used to tear/cut the foil.</span></li><li class="a-spacing-mini" style="list-style: disc; overflow-wrap: break-word; margin: 0px;"><span class="a-list-item">Roll length: 75 metres. Roll width: 450mm.</span></li></ul><p><br></p>',
    'nan',
    'simple',
    '450mm x 75m Aluminium Kitchen Catering Foil Roll - Oven Roast Baking Food Wrap | Buy Online at Best Price',
    'Shop 450mm x 75m Aluminium Kitchen Catering Foil Roll - Oven Roast Baking Food Wrap online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '0288c10a-a760-40ef-a183-f271d72746bd'
FROM "Category" c
WHERE c.slug = 'cling-film-foil-food-bags'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/c55a14d2b66297000e88d689741dabed.jpg',
    'PRODUCT',
    '0288c10a-a760-40ef-a183-f271d72746bd',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '936b8085-8eee-4cd4-9ceb-9143d657f635',
    'ADMIN',
    'Everyday 50L Lift Top Bin Cool Grey',
    'everyday-50l-lift-top-bin-cool-grey',
    '36102',
    5.62,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">50 litre capacity lift top bin. An essential kitchen utility item. Easy to clean and maintain.</span><br></p>',
    'Code: 36102
Dimensions: 41.00 x 32.00 x 64.00 cm
Weight: 1.218 kg',
    'simple',
    'Everyday 50L Lift Top Bin Cool Grey | Buy Online at Best Price',
    'Shop Everyday 50L Lift Top Bin Cool Grey online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '936b8085-8eee-4cd4-9ceb-9143d657f635'
FROM "Category" c
WHERE c.slug = 'kitchen-storage-organisation'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/b5c671c5c76e37b76a71c68b0886d96d.png',
    'PRODUCT',
    '936b8085-8eee-4cd4-9ceb-9143d657f635',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/a49af5ab435d2e613a6e356fad2bc84f.png',
    'PRODUCT',
    '936b8085-8eee-4cd4-9ceb-9143d657f635',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/75b73b00f8879fb2bd956f959c00a586.png',
    'PRODUCT',
    '936b8085-8eee-4cd4-9ceb-9143d657f635',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/e7626faa5faf09c0ea3cf8664727fc01.jpg',
    'PRODUCT',
    '936b8085-8eee-4cd4-9ceb-9143d657f635',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '26af18d9-5e42-4553-9f79-22cda0f643ac',
    'ADMIN',
    'Crystal 60Ltr Box & Lid Clear',
    'crystal-60ltr-box-lid-clear',
    '14025',
    5.37,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">High quality 60 litre storage box with clip on lid. Versatile storage suitable for all around the home and workplace.</span><br></p>',
    'Code: 14025
Dimensions: 60.00 x 40.00 x 33.00 cm
Weight: 1.7439 kg',
    'simple',
    'Crystal 60Ltr Box & Lid Clear | Buy Online at Best Price',
    'Shop Crystal 60Ltr Box & Lid Clear online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '26af18d9-5e42-4553-9f79-22cda0f643ac'
FROM "Category" c
WHERE c.slug = 'storage-containers-boxes'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/360981aa090009273e2d1f82ee43a039.png',
    'PRODUCT',
    '26af18d9-5e42-4553-9f79-22cda0f643ac',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/d5aa5ed65770fa104e7140a46eb8b0c3.png',
    'PRODUCT',
    '26af18d9-5e42-4553-9f79-22cda0f643ac',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/918756a111ebbe4cd5554281d2b0401d.jpg',
    'PRODUCT',
    '26af18d9-5e42-4553-9f79-22cda0f643ac',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/5717991e2057dca8f5fae639ad720b33.jpg',
    'PRODUCT',
    '26af18d9-5e42-4553-9f79-22cda0f643ac',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/710a8527ba8057d930754d34b00662a1.jpg',
    'PRODUCT',
    '26af18d9-5e42-4553-9f79-22cda0f643ac',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/510fc4b031d96838c4f79e19c2a47db9.jpg',
    'PRODUCT',
    '26af18d9-5e42-4553-9f79-22cda0f643ac',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/82aeb091fe35687b854f178dba762df3.jpg',
    'PRODUCT',
    '26af18d9-5e42-4553-9f79-22cda0f643ac',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '4aa37612-a17a-42fc-b228-142f41ff00af',
    'ADMIN',
    'Caterwrap Baking Parchment 45cm x 50 metres',
    'caterwrap-baking-parchment-45cm-x-50-metres',
    '21C24',
    6.25,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">Ideal for fat-free baking, Caterwrap Baking Parchment is siliconised on both sides for an easy release, non-stick surface. Therefore, there is no need to grease cake tins, baking sheets or the baking parchment itself. It is suitable for a variety of applications and is widely used as a lining agent for cake tins, cooking individual meringues, soufflés, choux pastry, biscuits, buns and rolls.</span><br></p>',
    'nan',
    'simple',
    'Caterwrap Baking Parchment 45cm x 50 metres | Buy Online at Best Price',
    'Shop Caterwrap Baking Parchment 45cm x 50 metres online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '4aa37612-a17a-42fc-b228-142f41ff00af'
FROM "Category" c
WHERE c.slug = 'baking-accessories-supplies'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230711/00b78268a98b3df67d032a55327d31b3.jpg',
    'PRODUCT',
    '4aa37612-a17a-42fc-b228-142f41ff00af',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230711/967aebdefdafc82c73cee0d0625269f5.png',
    'PRODUCT',
    '4aa37612-a17a-42fc-b228-142f41ff00af',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    'd5035c6e-8f8f-41e8-9347-0e4bd21b3cd6',
    'ADMIN',
    'Crystal 80L Box & Lid Clear',
    'crystal-80l-box-lid-clear',
    '11315',
    6.17,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(140, 140, 140); font-family: &quot;Avenir W01&quot;, Helvetica, Arial, sans-serif; font-size: 16px;">High quality large 80 litre storage box with clip on lid. Versatile storage suitable for all around the home and workplace.</span><br></p>',
    'Code: 11315
Dimensions: 60.00 x 40.00 x 42.00 cm
Weight: 1.9219 kg',
    'simple',
    'Crystal 80L Box & Lid Clear | Buy Online at Best Price',
    'Shop Crystal 80L Box & Lid Clear online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, 'd5035c6e-8f8f-41e8-9347-0e4bd21b3cd6'
FROM "Category" c
WHERE c.slug = 'storage-containers-boxes'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/68535b8c15466448ab936e53aad9a2db.png',
    'PRODUCT',
    'd5035c6e-8f8f-41e8-9347-0e4bd21b3cd6',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/c903b3dd406f396cdd6fdf52c3311147.png',
    'PRODUCT',
    'd5035c6e-8f8f-41e8-9347-0e4bd21b3cd6',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/0659af81fe63599bd4d550d46452b616.jpg',
    'PRODUCT',
    'd5035c6e-8f8f-41e8-9347-0e4bd21b3cd6',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/8f72ad5990bf4802b22e5dd1de1bea06.jpg',
    'PRODUCT',
    'd5035c6e-8f8f-41e8-9347-0e4bd21b3cd6',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/99137b61b29bf1d0091d910520706f34.jpg',
    'PRODUCT',
    'd5035c6e-8f8f-41e8-9347-0e4bd21b3cd6',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/0f19f3b165cd2323b417f963b387c563.jpg',
    'PRODUCT',
    'd5035c6e-8f8f-41e8-9347-0e4bd21b3cd6',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230619/22d0188f7db30549da81707906d84bdc.jpg',
    'PRODUCT',
    'd5035c6e-8f8f-41e8-9347-0e4bd21b3cd6',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '01decb75-27fb-4da7-a941-a2e94fa0235d',
    'ADMIN',
    'Non- Stick Baking Parchment Paper with Cutterbox Oven Safe Premium Quality Greaseproof Bakery Paper – 300mm x 50m',
    'non-stick-baking-parchment-paper-with-cutterbox-oven-safe-premium-quality-greaseproof-bakery-paper-300mm-x-50m',
    '21C25',
    3.15,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">Non- Stick Baking Parchment Paper with Cutterbox Premium Quality Greaseproof Bakery Paper Oven Safe – 30cm x 50m/45cm x 75m</span><br style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;"><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">Our Baking parchment Paper is great for baking cakes, biscuits and bread without the need to add any butter or grease, it is also freezer friendly and suitable for cooking in the oven and microwave.</span><br style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;"><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">Our Premium Quality baking parchment rolls have many uses and can be used for a variety of purposes, including packing and as a non-stick baking solution. It''s also widely used in commercial catering environment but is also fantastic for household use.</span><br style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;"><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">Suitable for cooking, baking, roasting, freezing, wrapping and storage</span><br style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;"><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">Non-Stick Baking Paper also called Bakery Paper, Silicon Paper or Butter Paper</span><br style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;"><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">Freezer Friendly Strong and durable</span><br style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;"><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">Handy Cutterbox with Safety Blade</span><br style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;"><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">Small Size - 300mm x 50m</span><br style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;"><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">Large Size - 450mm x 75m</span><br></p>',
    'nan',
    'simple',
    'Non- Stick Baking Parchment Paper with Cutterbox Oven Safe Premium Quality Greaseproof Bakery Paper – 300mm x 50m | Buy Online at Best Price',
    'Shop Non- Stick Baking Parchment Paper with Cutterbox Oven Safe Premium Quality Greaseproof Bakery Paper – 300mm x 50m online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '01decb75-27fb-4da7-a941-a2e94fa0235d'
FROM "Category" c
WHERE c.slug = 'baking-accessories-supplies'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230710/376bb7f6a51e1c5fa104442eac762557.jpg',
    'PRODUCT',
    '01decb75-27fb-4da7-a941-a2e94fa0235d',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    'bbdaf59d-301f-442e-8bc7-079ae8028459',
    'ADMIN',
    'Food Service Foil Sheets Premium Catering Quality Pre-Cut Kitchen Individual Pop-Up Aluminium Foil Sheets - 27cm x 30cm x 500',
    'food-service-foil-sheets-premium-catering-quality-pre-cut-kitchen-individual-pop-up-aluminium-foil-sheets-27cm-x-30cm-x-500',
    '59M31',
    19.14,
    NULL,
    NULL,
    100,
    TRUE,
    '<p style="padding: 0px; margin: 0em 0px 1em 1em; color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">500 x Food Service Foil Sheets Premium Catering Quality Pre-cut Kitchen Individual Pop-Up Aluminium Foil Sheets - 30cm x 27cm<br></p><p style="padding: 0px; margin: 0em 0px 1em 1em; color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">These high-quality, interfolded pre-cut sheets are a perfect way to help retain heat on items like hamburgers, hot dogs, sandwiches, baked potatoes, and so much more.</p><p style="padding: 0px; margin: 0em 0px 1em 1em; color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;"><br></p><p style="padding: 0px; margin: 0em 0px 1em 1em; color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">Featuring a pop-up design, this box of aluminium foil sheets ensures safety by eliminating the need for a blade. It also minimizes the amount of contact between your staff and the box for increased sanitation. In addition, the box works as both a storage container and dispensing box to save you space in your kitchen. With these aluminium foil sheets, you''ll always have a consistently-sized sheet at the ready, so you don''t have to estimate sheet sizes and thus waste product. Use them at your concession stand, fast food restaurant, or snack bar to save the time and the hassle associated with unrolling traditional foil rolls.</p><p style="padding: 0px; margin: 0em 0px 1em 1em; color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;"><br>Perfect for Wrapping Sandwiches, Burgers, Hot dogs, Baked potatoes and so much more<br>Ready Cut Food Service Foil Sheets are versatile and hassle free to use and Easy Dispense Box<br>Ideal for Restaurants, Delis, Catering, Take Out or at Home<br>Suitable for Oven, Grill and BBQ<br>Single Foil Sheet Size – 30cm x 27cm<br>Pack of 500 sheets per box</p>',
    '27cm x 30cm x 500
',
    'simple',
    'Food Service Foil Sheets Premium Catering Quality Pre-Cut Kitchen Individual Pop-Up Aluminium Foil Sheets - 27cm x 30cm x 500 | Buy Online at Best Price',
    'Shop Food Service Foil Sheets Premium Catering Quality Pre-Cut Kitchen Individual Pop-Up Aluminium Foil Sheets - 27cm x 30cm x 500 online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, 'bbdaf59d-301f-442e-8bc7-079ae8028459'
FROM "Category" c
WHERE c.slug = 'cling-film-foil-food-bags'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230711/4cf462083232fa373276e2d77ff42a6e.png',
    'PRODUCT',
    'bbdaf59d-301f-442e-8bc7-079ae8028459',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230711/4d1d7f2a943814a2f99dc8c5c11f2f13.png',
    'PRODUCT',
    'bbdaf59d-301f-442e-8bc7-079ae8028459',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '5e4cefbe-be68-4720-bcc9-152cb574db8f',
    'ADMIN',
    'Bacofoil Professional Easycut Cling Film & Dispenser 250 Metres x 35 cms, White, 40 x 8.4 x 7.4 cm',
    'bacofoil-professional-easycut-cling-film-dispenser-250-metres-x-35-cms-white-40-x-8-4-x-7-4-cm',
    '70B09',
    9.48,
    NULL,
    NULL,
    100,
    TRUE,
    '<p style="padding: 0px; margin: 0em 0px 1em 1em; color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">Easycut dispenser system with 250 metres of cling film cling film is 350mm wide suitable for all food types seals in flavour &amp; prevents odour transfer conforms to all current EC directives for food use</p><h3 style="padding: 0px 0px 4px; margin: 0.75em 0px 0.375em -1px; text-rendering: optimizelegibility; font-size: 1.23em; line-height: 24px; color: rgb(51, 51, 51); clear: left; font-family: &quot;Amazon Ember&quot;, Arial, sans-serif;">Box Contains</h3><p style="padding: 0px; margin: 0em 0px 1em 1em; color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">1 x Bacofoil Professional Easycut Cling Film &amp; Dispenser 250 Metres x 35 cms</p>',
    'nan',
    'simple',
    'Bacofoil Professional Easycut Cling Film & Dispenser 250 Metres x 35 cms, White, 40 x 8.4 x 7.4 cm | Buy Online at Best Price',
    'Shop Bacofoil Professional Easycut Cling Film & Dispenser 250 Metres x 35 cms, White, 40 x 8.4 x 7.4 cm online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '5e4cefbe-be68-4720-bcc9-152cb574db8f'
FROM "Category" c
WHERE c.slug = 'cling-film-foil-food-bags'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230710/23e1a2ac7077ac636cbf588f5c956d12.jpg',
    'PRODUCT',
    '5e4cefbe-be68-4720-bcc9-152cb574db8f',
    NOW(),
    NOW()
);


INSERT INTO "Product" (
    "id",
    "vendor",
    "name",
    "slug",
    "sku",
    "price",
    "discountedPrice",
    "discountedPercentage",
    "stock",
    "visibility",
    "description",
    "shortDescription",
    "type",
    "metaTitle",
    "metaDescription",
    "createdAt",
    "updatedAt"
)
VALUES (
    '547825a8-5c5e-411a-818c-593efe487eb8',
    'ADMIN',
    'Professional Non- Stick Baking Parchment Paper Premium Quality Greaseproof Paper Fridge & Freezer, Microwave and Oven Safe – 450mm x 50m',
    'professional-non-stick-baking-parchment-paper-premium-quality-greaseproof-paper-fridge-freezer-microwave-and-oven-safe-450mm-x-50m',
    '21B23',
    5.45,
    NULL,
    NULL,
    100,
    TRUE,
    '<p><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">Professional Non- Stick Baking Parchment Paper Premium Quality Greaseproof Paper Fridge &amp; freezer, microwave and oven safe (up to 220°C)– 450cm x 50m</span><br style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;"><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">Classic cakes. Elaborate gateaux. Trendy muffins. With our versatile baking paper, you can fully concentrate on the art of baking. The oven and your baking trays remain clean. The rest is just fun!</span><br style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;"><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">he innovative and unique non-stick textured surface reduces the amount of contact with the bake, meaning that everything from cookies, cakes and doughs will bake evenly and slide effortlessly off the paper, delivering a perfect bake every time, and the newly developed non-slip base prevents annoying rolling up and slipping, meaning that the paper will remain resolutely flat on the surface to which it is applied, and once flat doesn’t move from side to side, meaning all you need to worry about it baking the tastiest food!</span><br style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;"><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">In addition to this, because both sides of the paper are Non-Stick, any excess grease is unable to seep through, meaning less mess and less washing up. The roll is 45cm wide and 50m long so perfect for both small and larger bakes.</span><br style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;"><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">Suitable for cooking, baking, roasting, freezing, wrapping and storage</span><br style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;"><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">No need to oil before use. Paper is coated with a food safe silicone, making it non-stic</span><br style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;"><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">Perfect for all types of baking Handy Cutterbox with Safety Blade</span><br style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;"><span style="color: rgb(51, 51, 51); font-family: &quot;Amazon Ember&quot;, Arial, sans-serif; font-size: small;">Baking Paper Size - 450mm x 50m</span><br></p>',
    'nan',
    'simple',
    'Professional Non- Stick Baking Parchment Paper Premium Quality Greaseproof Paper Fridge & Freezer, Microwave and Oven Safe – 450mm x 50m | Buy Online at Best Price',
    'Shop Professional Non- Stick Baking Parchment Paper Premium Quality Greaseproof Paper Fridge & Freezer, Microwave and Oven Safe – 450mm x 50m online with fast delivery and great value. Quality household, kitchen, storage, and everyday essentials available now.',
    NOW(),
    NOW()
)
ON CONFLICT ("sku") DO NOTHING;


INSERT INTO "_CategoryProducts" ("A", "B")
SELECT c.id, '547825a8-5c5e-411a-818c-593efe487eb8'
FROM "Category" c
WHERE c.slug = 'baking-accessories-supplies'
ON CONFLICT DO NOTHING;


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230711/b824aa8b25135c597b3e1f65e0fb2ab7.jpg',
    'PRODUCT',
    '547825a8-5c5e-411a-818c-593efe487eb8',
    NOW(),
    NOW()
);


INSERT INTO "Image" (
    "id",
    "url",
    "type",
    "productId",
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'https://mymarts.co.uk/public/uploads/20230711/0cb31bed1d3171be68ad59c8f1af2270.jpg',
    'PRODUCT',
    '547825a8-5c5e-411a-818c-593efe487eb8',
    NOW(),
    NOW()
);
