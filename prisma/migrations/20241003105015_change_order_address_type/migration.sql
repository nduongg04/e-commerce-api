/*
  Warnings:

  - You are about to drop the `OrderAddress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orderAddress` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderAddress" DROP CONSTRAINT "OrderAddress_orderId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderAddress" TEXT NOT NULL;

-- DropTable
DROP TABLE "OrderAddress";
