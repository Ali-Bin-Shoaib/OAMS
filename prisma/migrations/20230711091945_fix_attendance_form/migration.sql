/*
  Warnings:

  - You are about to drop the column `schoolName` on the `EducationInfo` table. All the data in the column will be lost.
  - The `returnDay` column on the `OrphanAttendance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `activityInfoId` on table `ActivityExecutionInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orphanId` on table `EducationInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orphanId` on table `HealthInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Notification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `capacity` on table `Room` required. This step will fail if there are existing NULL values in that column.
  - Made the column `activityInfoId` on table `UnAchievedActivity` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ActivityExecutionInfo" DROP CONSTRAINT "ActivityExecutionInfo_activityInfoId_fkey";

-- DropForeignKey
ALTER TABLE "ActivityGoal" DROP CONSTRAINT "ActivityGoal_goalId_fkey";

-- DropForeignKey
ALTER TABLE "EducationInfo" DROP CONSTRAINT "EducationInfo_orphanId_fkey";

-- DropForeignKey
ALTER TABLE "EmergencyContactInfo" DROP CONSTRAINT "EmergencyContactInfo_orphanId_fkey";

-- DropForeignKey
ALTER TABLE "GoalEvaluation" DROP CONSTRAINT "GoalEvaluation_goalId_fkey";

-- DropForeignKey
ALTER TABLE "HealthInfo" DROP CONSTRAINT "HealthInfo_orphanId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrphanActivityExecution" DROP CONSTRAINT "OrphanActivityExecution_orphanId_fkey";

-- DropForeignKey
ALTER TABLE "UnAchievedActivity" DROP CONSTRAINT "UnAchievedActivity_activityInfoId_fkey";

-- AlterTable
ALTER TABLE "ActivityExecutionInfo" ALTER COLUMN "activityInfoId" SET NOT NULL;

-- AlterTable
ALTER TABLE "EducationInfo" DROP COLUMN "schoolName",
ADD COLUMN     "note" TEXT,
ADD COLUMN     "schoolYear" INTEGER,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "orphanId" SET NOT NULL;

-- AlterTable
ALTER TABLE "HealthInfo" ALTER COLUMN "orphanId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "OrphanAttendance" DROP COLUMN "returnDay",
ADD COLUMN     "returnDay" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "capacity" SET NOT NULL;

-- AlterTable
ALTER TABLE "UnAchievedActivity" ALTER COLUMN "activityInfoId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ActivityGoal" ADD CONSTRAINT "ActivityGoal_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalEvaluation" ADD CONSTRAINT "GoalEvaluation_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityExecutionInfo" ADD CONSTRAINT "ActivityExecutionInfo_activityInfoId_fkey" FOREIGN KEY ("activityInfoId") REFERENCES "ActivityInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrphanActivityExecution" ADD CONSTRAINT "OrphanActivityExecution_orphanId_fkey" FOREIGN KEY ("orphanId") REFERENCES "Orphan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EducationInfo" ADD CONSTRAINT "EducationInfo_orphanId_fkey" FOREIGN KEY ("orphanId") REFERENCES "Orphan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyContactInfo" ADD CONSTRAINT "EmergencyContactInfo_orphanId_fkey" FOREIGN KEY ("orphanId") REFERENCES "Orphan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnAchievedActivity" ADD CONSTRAINT "UnAchievedActivity_activityInfoId_fkey" FOREIGN KEY ("activityInfoId") REFERENCES "ActivityInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthInfo" ADD CONSTRAINT "HealthInfo_orphanId_fkey" FOREIGN KEY ("orphanId") REFERENCES "Orphan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
