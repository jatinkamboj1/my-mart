/*
  Warnings:

  - The primary key for the `_CartDiscounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_CategoryImages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_CategoryProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_CategoryTags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_OrderDiscounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_ProductTags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_CartDiscounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_CategoryImages` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_CategoryProducts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_CategoryTags` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_OrderDiscounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_ProductTags` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "ccDistance" TEXT,
ADD COLUMN     "collection" TEXT,
ADD COLUMN     "colour" TEXT,
ADD COLUMN     "diameter" TEXT,
ADD COLUMN     "doorPosition" TEXT,
ADD COLUMN     "fixingType" TEXT,
ADD COLUMN     "height" TEXT,
ADD COLUMN     "heightAdjustment" TEXT,
ADD COLUMN     "installationToCabinet" TEXT,
ADD COLUMN     "lengthOfEjection" TEXT,
ADD COLUMN     "magnet" TEXT,
ADD COLUMN     "material" TEXT,
ADD COLUMN     "model" TEXT,
ADD COLUMN     "pushForOpen" TEXT,
ADD COLUMN     "rectification" TEXT,
ADD COLUMN     "setWithMountingPlate" TEXT,
ADD COLUMN     "slidesThickness" TEXT,
ADD COLUMN     "softClose" TEXT,
ADD COLUMN     "staticLoadingCapacity" TEXT,
ADD COLUMN     "surfaceFinishing" TEXT,
ADD COLUMN     "typeOfTread" TEXT;

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "ccDistance" TEXT,
ADD COLUMN     "colour" TEXT,
ADD COLUMN     "diameter" TEXT,
ADD COLUMN     "doorPosition" TEXT,
ADD COLUMN     "fixingType" TEXT,
ADD COLUMN     "height" TEXT,
ADD COLUMN     "heightAdjustment" TEXT,
ADD COLUMN     "installationToCabinet" TEXT,
ADD COLUMN     "lengthOfEjection" TEXT,
ADD COLUMN     "magnet" TEXT,
ADD COLUMN     "material" TEXT,
ADD COLUMN     "model" TEXT,
ADD COLUMN     "pushForOpen" TEXT,
ADD COLUMN     "setWithMountingPlate" TEXT,
ADD COLUMN     "slidesThickness" TEXT,
ADD COLUMN     "softClose" TEXT,
ADD COLUMN     "staticLoadingCapacity" TEXT,
ADD COLUMN     "surfaceFinishing" TEXT,
ADD COLUMN     "typeOfTread" TEXT;

-- AlterTable
ALTER TABLE "_CartDiscounts" DROP CONSTRAINT "_CartDiscounts_AB_pkey";

-- AlterTable
ALTER TABLE "_CategoryImages" DROP CONSTRAINT "_CategoryImages_AB_pkey";

-- AlterTable
ALTER TABLE "_CategoryProducts" DROP CONSTRAINT "_CategoryProducts_AB_pkey";

-- AlterTable
ALTER TABLE "_CategoryTags" DROP CONSTRAINT "_CategoryTags_AB_pkey";

-- AlterTable
ALTER TABLE "_OrderDiscounts" DROP CONSTRAINT "_OrderDiscounts_AB_pkey";

-- AlterTable
ALTER TABLE "_ProductTags" DROP CONSTRAINT "_ProductTags_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_CartDiscounts_AB_unique" ON "_CartDiscounts"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryImages_AB_unique" ON "_CategoryImages"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryProducts_AB_unique" ON "_CategoryProducts"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryTags_AB_unique" ON "_CategoryTags"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrderDiscounts_AB_unique" ON "_OrderDiscounts"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductTags_AB_unique" ON "_ProductTags"("A", "B");
