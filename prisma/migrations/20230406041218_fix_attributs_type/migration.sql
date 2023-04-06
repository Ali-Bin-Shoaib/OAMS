/*
  Warnings:

  - You are about to drop the column `total` on the `Orphan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orphan" DROP COLUMN "total",
ALTER COLUMN "motherJobPhone" SET DATA TYPE TEXT;
