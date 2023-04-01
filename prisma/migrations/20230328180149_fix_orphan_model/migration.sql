/*
  Warnings:

  - Made the column `name` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `Orphan` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Orphan" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "gender" SET NOT NULL;
