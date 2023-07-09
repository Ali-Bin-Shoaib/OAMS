/*
  Warnings:

  - Made the column `criteriaId` on table `BehaviorCriteria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `behaviorInfoId` on table `BehaviorCriteria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `BehaviorCriteria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `BehaviorInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orphanId` on table `BehaviorInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Criteria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Criteria` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BehaviorCriteria" DROP CONSTRAINT "BehaviorCriteria_criteriaId_fkey";

-- DropForeignKey
ALTER TABLE "BehaviorCriteria" DROP CONSTRAINT "BehaviorCriteria_userId_fkey";

-- DropForeignKey
ALTER TABLE "BehaviorInfo" DROP CONSTRAINT "BehaviorInfo_orphanId_fkey";

-- DropForeignKey
ALTER TABLE "BehaviorInfo" DROP CONSTRAINT "BehaviorInfo_userId_fkey";

-- DropForeignKey
ALTER TABLE "Criteria" DROP CONSTRAINT "Criteria_userId_fkey";

-- DropForeignKey
ALTER TABLE "Guardian" DROP CONSTRAINT "Guardian_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sponsor" DROP CONSTRAINT "Sponsor_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sponsorship" DROP CONSTRAINT "Sponsorship_orphanId_fkey";

-- AlterTable
ALTER TABLE "BehaviorCriteria" ALTER COLUMN "criteriaId" SET NOT NULL,
ALTER COLUMN "behaviorInfoId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "BehaviorInfo" ALTER COLUMN "date" DROP NOT NULL,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "orphanId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Criteria" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Guardian" ADD CONSTRAINT "Guardian_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsorship" ADD CONSTRAINT "Sponsorship_orphanId_fkey" FOREIGN KEY ("orphanId") REFERENCES "Orphan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BehaviorInfo" ADD CONSTRAINT "BehaviorInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BehaviorInfo" ADD CONSTRAINT "BehaviorInfo_orphanId_fkey" FOREIGN KEY ("orphanId") REFERENCES "Orphan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Criteria" ADD CONSTRAINT "Criteria_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BehaviorCriteria" ADD CONSTRAINT "BehaviorCriteria_criteriaId_fkey" FOREIGN KEY ("criteriaId") REFERENCES "Criteria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BehaviorCriteria" ADD CONSTRAINT "BehaviorCriteria_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
