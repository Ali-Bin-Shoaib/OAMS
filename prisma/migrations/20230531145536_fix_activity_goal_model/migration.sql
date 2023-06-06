/*
  Warnings:

  - A unique constraint covering the columns `[goalInfoId,activityInfoId]` on the table `ActivityGoal` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `ActivityInfo` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ActivityInfo" DROP CONSTRAINT "ActivityInfo_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sponsorship" DROP CONSTRAINT "Sponsorship_sponsorId_fkey";

-- AlterTable
ALTER TABLE "ActivityGoal" ALTER COLUMN "evaluation" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ActivityInfo" ALTER COLUMN "quarter" DROP NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Sponsorship" ALTER COLUMN "sponsorId" DROP NOT NULL,
ALTER COLUMN "orphanId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ActivityGoal_goalInfoId_activityInfoId_key" ON "ActivityGoal"("goalInfoId", "activityInfoId");

-- AddForeignKey
ALTER TABLE "Sponsorship" ADD CONSTRAINT "Sponsorship_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "Sponsor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityInfo" ADD CONSTRAINT "ActivityInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
