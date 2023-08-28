/*
  Warnings:

  - You are about to drop the column `goalId` on the `OrphanActivityExecution` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrphanActivityExecution" DROP CONSTRAINT "OrphanActivityExecution_goalId_fkey";

-- AlterTable
ALTER TABLE "OrphanActivityExecution" DROP COLUMN "goalId";
