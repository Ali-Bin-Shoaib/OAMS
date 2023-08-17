/*
  Warnings:

  - Made the column `startDate` on table `ActivityExecutionInfo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ActivityExecutionInfo" ALTER COLUMN "startDate" SET NOT NULL;
