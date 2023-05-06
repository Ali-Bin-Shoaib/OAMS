/*
  Warnings:

  - You are about to drop the column `monthlyIncom` on the `Orphan` table. All the data in the column will be lost.
  - The `image` column on the `Orphan` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Orphan" DROP COLUMN "monthlyIncom",
ADD COLUMN     "monthlyIncome" DOUBLE PRECISION,
DROP COLUMN "image",
ADD COLUMN     "image" JSONB;
