/*
  Warnings:

  - The `homeType` column on the `Orphan` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Orphan" DROP COLUMN "homeType",
ADD COLUMN     "homeType" TEXT[] DEFAULT ARRAY['owned', 'rent']::TEXT[];
