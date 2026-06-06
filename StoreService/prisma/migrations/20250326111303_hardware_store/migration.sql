-- CreateEnum
CREATE TYPE "PhoneStatus" AS ENUM ('UNVERIFIED', 'VERIFIED');

-- AlterTable
ALTER TABLE "Discount" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderNumber" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "PhoneStatus" NOT NULL DEFAULT 'UNVERIFIED';

-- AlterTable
ALTER TABLE "_CartDiscounts" ADD CONSTRAINT "_CartDiscounts_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CartDiscounts_AB_unique";

-- AlterTable
ALTER TABLE "_CategoryImages" ADD CONSTRAINT "_CategoryImages_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CategoryImages_AB_unique";

-- AlterTable
ALTER TABLE "_CategoryProducts" ADD CONSTRAINT "_CategoryProducts_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CategoryProducts_AB_unique";

-- AlterTable
ALTER TABLE "_CategoryTags" ADD CONSTRAINT "_CategoryTags_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CategoryTags_AB_unique";

-- AlterTable
ALTER TABLE "_OrderDiscounts" ADD CONSTRAINT "_OrderDiscounts_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_OrderDiscounts_AB_unique";

-- AlterTable
ALTER TABLE "_ProductTags" ADD CONSTRAINT "_ProductTags_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ProductTags_AB_unique";
