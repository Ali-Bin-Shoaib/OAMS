/*
  Warnings:

  - Made the column `fatherDeathDate` on table `Orphan` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Orphan" ALTER COLUMN "fatherDeathDate" SET NOT NULL;
