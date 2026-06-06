/*
  Warnings:

  - The values [SHIPPED] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `price` on the `BulkPrice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `percentage` on the `BulkPrice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(5,2)`.
  - You are about to alter the column `discountedPrice` on the `CartItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `unitPrice` on the `CartItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `amount` on the `Discount` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to drop the column `paid` on the `Order` table. All the data in the column will be lost.
  - You are about to alter the column `total` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `actualAmount` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `ShippingAmount` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `discountPrice` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `price` on the `OrderProduct` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `discountedPrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `discountedPercentage` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(5,2)`.
  - You are about to drop the column `quantity` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `ProductVariant` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `discountedPrice` on the `ProductVariant` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `discountedPercentage` on the `ProductVariant` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(5,2)`.
  - You are about to alter the column `feeAmount` on the `ShippingFee` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `minOrderValue` on the `ShippingFee` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `maxOrderValue` on the `ShippingFee` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `creditBalance` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - A unique constraint covering the columns `[name]` on the table `DeliveryType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[zone,deliveryTypeId,feeAmount,minOrderValue,maxOrderValue]` on the table `ShippingFee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `mobileNumber` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userName` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `discountPrice` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `stock` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChargeOperation" AS ENUM ('ADD', 'SUBTRACT', 'MULTIPLY', 'DIVIDE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('CREATED', 'REQUIRES_ACTION', 'PROCESSING', 'SUCCEEDED', 'FAILED', 'CANCELED', 'PARTIALLY_REFUNDED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentMethodType" AS ENUM ('CARD', 'APPLE_PAY', 'GOOGLE_PAY', 'BANK_TRANSFER', 'STRIPE_LINK');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('AUTHORIZATION', 'CAPTURE', 'CHARGE', 'REFUND', 'PARTIAL_REFUND', 'VOID', 'FAILURE');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "CaptureMethod" AS ENUM ('AUTOMATIC', 'MANUAL');

-- CreateEnum
CREATE TYPE "RefundReason" AS ENUM ('CUSTOMER_REQUEST', 'DAMAGED', 'NOT_AS_DESIBED', 'FRAUD', 'OTHER');

-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('CREATED', 'PENDING', 'CONFIRMED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED', 'INCART');
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Addresses" ALTER COLUMN "addressType" DROP NOT NULL;

-- AlterTable
ALTER TABLE "BulkPrice" ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "percentage" SET DATA TYPE DECIMAL(5,2);

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "discountedPrice" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "unitPrice" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "isHighlighted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "menuType" TEXT,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Discount" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paid",
ADD COLUMN     "chargesAmount" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "deliveryCode" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paymentType" "OrderPaid",
ADD COLUMN     "summary" JSONB,
ALTER COLUMN "total" SET DEFAULT 0.00,
ALTER COLUMN "total" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "actualAmount" SET DEFAULT 0.00,
ALTER COLUMN "actualAmount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "status" SET DEFAULT 'CREATED',
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "mobileNumber" SET NOT NULL,
ALTER COLUMN "userName" SET NOT NULL,
ALTER COLUMN "ShippingAmount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "discountPrice" SET NOT NULL,
ALTER COLUMN "discountPrice" SET DEFAULT 0.00,
ALTER COLUMN "discountPrice" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "OrderProduct" ADD COLUMN     "skuId" TEXT,
ADD COLUMN     "weightInGrams" INTEGER,
ALTER COLUMN "price" DROP DEFAULT,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "quantity",
ADD COLUMN     "stock" INTEGER NOT NULL,
ALTER COLUMN "price" SET DEFAULT 0.00,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "discountedPrice" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "discountedPercentage" SET DATA TYPE DECIMAL(5,2);

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "quantity",
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "discountedPrice" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "salableQuantity" DROP DEFAULT,
ALTER COLUMN "discountedPercentage" SET DATA TYPE DECIMAL(5,2);

-- AlterTable
ALTER TABLE "ShippingFee" ALTER COLUMN "feeAmount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "minOrderValue" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "maxOrderValue" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "creditBalance" SET DATA TYPE DECIMAL(10,2);

-- CreateTable
CREATE TABLE "Charges" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "helpText" TEXT,
    "order" INTEGER NOT NULL,
    "percentage" DECIMAL(5,2),
    "flatRate" DECIMAL(10,2),
    "operation" "ChargeOperation" NOT NULL DEFAULT 'ADD',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Charges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShipmentTracking" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "trackingNumber" TEXT,
    "labelUrl" TEXT,
    "orderReference" TEXT,
    "orderIdentifier" TEXT,
    "packageDetails" JSONB,
    "synced" BOOLEAN NOT NULL DEFAULT false,
    "lastEvent" TEXT,
    "lastEventAt" TIMESTAMP(3),
    "statusHistory" JSONB,
    "rawResponse" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShipmentTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "paymentIntentId" TEXT NOT NULL,
    "customerId" TEXT,
    "chargeId" TEXT,
    "captureMethod" "CaptureMethod" NOT NULL DEFAULT 'AUTOMATIC',
    "currency" TEXT NOT NULL DEFAULT 'GBP',
    "amount" DECIMAL(10,2) NOT NULL,
    "amountCaptured" DECIMAL(10,2),
    "amountRefunded" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "status" "PaymentStatus" NOT NULL DEFAULT 'CREATED',
    "method" "PaymentMethodType",
    "receiptUrl" TEXT,
    "failureReason" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentTransaction" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "transactionId" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'GBP',
    "balanceTransactionId" TEXT,
    "reason" TEXT,
    "rawResponse" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dispute" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "disputeId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "status" TEXT NOT NULL,
    "reason" "RefundReason" NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dispute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT,
    "jsonValue" JSONB,
    "description" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterSubscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "consentGiven" BOOLEAN NOT NULL DEFAULT false,
    "consentAt" TIMESTAMP(3),
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Charges_name_key" ON "Charges"("name");

-- CreateIndex
CREATE INDEX "Charges_operation_idx" ON "Charges"("operation");

-- CreateIndex
CREATE INDEX "Charges_isActive_idx" ON "Charges"("isActive");

-- CreateIndex
CREATE INDEX "Charges_isDeleted_idx" ON "Charges"("isDeleted");

-- CreateIndex
CREATE UNIQUE INDEX "ShipmentTracking_orderId_key" ON "ShipmentTracking"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "ShipmentTracking_orderReference_key" ON "ShipmentTracking"("orderReference");

-- CreateIndex
CREATE INDEX "ShipmentTracking_provider_idx" ON "ShipmentTracking"("provider");

-- CreateIndex
CREATE INDEX "ShipmentTracking_trackingNumber_idx" ON "ShipmentTracking"("trackingNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_paymentIntentId_key" ON "Payment"("paymentIntentId");

-- CreateIndex
CREATE INDEX "Payment_orderId_idx" ON "Payment"("orderId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "Payment"("status");

-- CreateIndex
CREATE INDEX "Payment_paymentIntentId_idx" ON "Payment"("paymentIntentId");

-- CreateIndex
CREATE INDEX "PaymentTransaction_paymentId_idx" ON "PaymentTransaction"("paymentId");

-- CreateIndex
CREATE INDEX "PaymentTransaction_transactionId_idx" ON "PaymentTransaction"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentTransaction_transactionId_type_key" ON "PaymentTransaction"("transactionId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Dispute_disputeId_key" ON "Dispute"("disputeId");

-- CreateIndex
CREATE UNIQUE INDEX "SiteSetting_key_key" ON "SiteSetting"("key");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryType_name_key" ON "DeliveryType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ShippingFee_zone_deliveryTypeId_feeAmount_minOrderValue_max_key" ON "ShippingFee"("zone", "deliveryTypeId", "feeAmount", "minOrderValue", "maxOrderValue");

-- AddForeignKey
ALTER TABLE "ShipmentTracking" ADD CONSTRAINT "ShipmentTracking_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentTransaction" ADD CONSTRAINT "PaymentTransaction_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
