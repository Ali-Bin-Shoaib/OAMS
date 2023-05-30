/*
  Warnings:

  - You are about to drop the column `goalTitleId` on the `ActivityGoal` table. All the data in the column will be lost.
  - You are about to drop the column `activityExecutionInfoId` on the `GoalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `activityGoalId` on the `GoalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `GoalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `evaluation` on the `GoalInfo` table. All the data in the column will be lost.
  - You are about to drop the `GoalTitle` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `evaluation` to the `ActivityGoal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `GoalInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ActivityGoal" DROP CONSTRAINT "ActivityGoal_goalTitleId_fkey";

-- DropForeignKey
ALTER TABLE "GoalInfo" DROP CONSTRAINT "GoalInfo_activityExecutionInfoId_fkey";

-- DropForeignKey
ALTER TABLE "GoalInfo" DROP CONSTRAINT "GoalInfo_activityGoalId_fkey";

-- DropForeignKey
ALTER TABLE "GoalTitle" DROP CONSTRAINT "GoalTitle_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrphanAttendance" DROP CONSTRAINT "OrphanAttendance_orphanId_fkey";

-- AlterTable
ALTER TABLE "ActivityGoal" DROP COLUMN "goalTitleId",
ADD COLUMN     "activityExecutionInfoId" INTEGER,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "evaluation" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "goalInfoId" INTEGER;

-- AlterTable
ALTER TABLE "GoalInfo" DROP COLUMN "activityExecutionInfoId",
DROP COLUMN "activityGoalId",
DROP COLUMN "date",
DROP COLUMN "evaluation",
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "GoalTitle";

-- AddForeignKey
ALTER TABLE "OrphanAttendance" ADD CONSTRAINT "OrphanAttendance_orphanId_fkey" FOREIGN KEY ("orphanId") REFERENCES "Orphan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityGoal" ADD CONSTRAINT "ActivityGoal_goalInfoId_fkey" FOREIGN KEY ("goalInfoId") REFERENCES "GoalInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityGoal" ADD CONSTRAINT "ActivityGoal_activityExecutionInfoId_fkey" FOREIGN KEY ("activityExecutionInfoId") REFERENCES "ActivityExecutionInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
