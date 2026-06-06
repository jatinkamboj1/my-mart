/*
  Warnings:

  - You are about to drop the column `boardThickness` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `brackets` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `cataloguePage` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `ccDistance` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `collection` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `colour` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `diameter` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `doorPosition` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `fixingType` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `heightAdjustment` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `installationToCabinet` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `lengthOfEjection` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `loadingCapacity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `magnet` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `mechanism` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `pushForOpen` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `quantityInBox` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `rectification` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `setWithMountingPlate` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `slidesThickness` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `softClose` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `staticLoadingCapacity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `surfaceFinishing` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `synchronisation` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `typeOfTread` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `boardThickness` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `brackets` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `cataloguePage` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `ccDistance` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `colour` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `diameter` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `doorPosition` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `fixingType` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `heightAdjustment` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `installationToCabinet` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `lengthOfEjection` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `loadingCapacity` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `magnet` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `mechanism` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `pushForOpen` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `quantityInBox` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `setWithMountingPlate` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `slidesThickness` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `softClose` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `staticLoadingCapacity` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `surfaceFinishing` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `synchronisation` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `typeOfTread` on the `ProductVariant` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_OrderDiscounts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `unitPrice` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ROLES" AS ENUM ('CUSTOMER', 'ADMIN', 'MANAGER', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "HandlingType" AS ENUM ('NORMAL', 'FRAGILE', 'PERISHABLE');

-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'CREATED';

-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "_OrderDiscounts" DROP CONSTRAINT "_OrderDiscounts_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderDiscounts" DROP CONSTRAINT "_OrderDiscounts_B_fkey";

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "discountedPrice" DOUBLE PRECISION,
ADD COLUMN     "unitPrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Discount" ALTER COLUMN "usageLimit" DROP NOT NULL,
ALTER COLUMN "usageLimit" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "discountPrice" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "OrderProduct" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "boardThickness",
DROP COLUMN "brackets",
DROP COLUMN "cataloguePage",
DROP COLUMN "ccDistance",
DROP COLUMN "collection",
DROP COLUMN "colour",
DROP COLUMN "diameter",
DROP COLUMN "doorPosition",
DROP COLUMN "fixingType",
DROP COLUMN "heightAdjustment",
DROP COLUMN "installationToCabinet",
DROP COLUMN "lengthOfEjection",
DROP COLUMN "loadingCapacity",
DROP COLUMN "magnet",
DROP COLUMN "mechanism",
DROP COLUMN "model",
DROP COLUMN "pushForOpen",
DROP COLUMN "quantityInBox",
DROP COLUMN "rectification",
DROP COLUMN "setWithMountingPlate",
DROP COLUMN "slidesThickness",
DROP COLUMN "softClose",
DROP COLUMN "staticLoadingCapacity",
DROP COLUMN "surfaceFinishing",
DROP COLUMN "synchronisation",
DROP COLUMN "typeOfTread",
ADD COLUMN     "capacity" TEXT,
ADD COLUMN     "color" TEXT,
ADD COLUMN     "discountedPercentage" DOUBLE PRECISION,
ADD COLUMN     "handlingType" "HandlingType" NOT NULL DEFAULT 'NORMAL',
ADD COLUMN     "weight" TEXT,
ADD COLUMN     "width" TEXT;

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "boardThickness",
DROP COLUMN "brackets",
DROP COLUMN "cataloguePage",
DROP COLUMN "ccDistance",
DROP COLUMN "colour",
DROP COLUMN "diameter",
DROP COLUMN "doorPosition",
DROP COLUMN "fixingType",
DROP COLUMN "heightAdjustment",
DROP COLUMN "installationToCabinet",
DROP COLUMN "lengthOfEjection",
DROP COLUMN "loadingCapacity",
DROP COLUMN "magnet",
DROP COLUMN "mechanism",
DROP COLUMN "model",
DROP COLUMN "pushForOpen",
DROP COLUMN "quantityInBox",
DROP COLUMN "setWithMountingPlate",
DROP COLUMN "slidesThickness",
DROP COLUMN "softClose",
DROP COLUMN "staticLoadingCapacity",
DROP COLUMN "surfaceFinishing",
DROP COLUMN "synchronisation",
DROP COLUMN "typeOfTread",
ADD COLUMN     "capacity" TEXT,
ADD COLUMN     "color" TEXT,
ADD COLUMN     "discountedPercentage" DOUBLE PRECISION,
ADD COLUMN     "weight" TEXT,
ADD COLUMN     "width" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "ROLES" NOT NULL DEFAULT 'CUSTOMER';

-- DropTable
DROP TABLE "_OrderDiscounts";

-- CreateTable
CREATE TABLE "BulkPrice" (
    "id" TEXT NOT NULL,
    "productId" TEXT,
    "productVariantId" TEXT,
    "minQuantity" INTEGER NOT NULL,
    "maxQuantity" INTEGER,
    "price" DOUBLE PRECISION NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BulkPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeliveryType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingFee" (
    "id" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "deliveryTypeId" TEXT NOT NULL,
    "feeAmount" DOUBLE PRECISION NOT NULL,
    "minOrderValue" DOUBLE PRECISION,
    "maxOrderValue" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShippingFee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BulkPrice_productId_idx" ON "BulkPrice"("productId");

-- CreateIndex
CREATE INDEX "BulkPrice_productVariantId_idx" ON "BulkPrice"("productVariantId");

-- CreateIndex
CREATE INDEX "ShippingFee_zone_idx" ON "ShippingFee"("zone");

-- CreateIndex
CREATE INDEX "ShippingFee_deliveryTypeId_idx" ON "ShippingFee"("deliveryTypeId");

-- AddForeignKey
ALTER TABLE "BulkPrice" ADD CONSTRAINT "BulkPrice_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BulkPrice" ADD CONSTRAINT "BulkPrice_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShippingFee" ADD CONSTRAINT "ShippingFee_deliveryTypeId_fkey" FOREIGN KEY ("deliveryTypeId") REFERENCES "DeliveryType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
