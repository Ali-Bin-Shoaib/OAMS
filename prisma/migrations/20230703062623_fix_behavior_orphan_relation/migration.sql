/*
  Warnings:

  - You are about to drop the column `userId` on the `ActivityExecutionInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[goalId,activityExecutionInfoId]` on the table `GoalEvaluation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `executorId` to the `ActivityExecutionInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ActivityExecutionInfo" DROP CONSTRAINT "ActivityExecutionInfo_userId_fkey";

-- DropForeignKey
ALTER TABLE "ActivityGoal" DROP CONSTRAINT "ActivityGoal_activityInfoId_fkey";

-- DropForeignKey
ALTER TABLE "GoalEvaluation" DROP CONSTRAINT "GoalEvaluation_activityExecutionInfoId_fkey";

-- DropForeignKey
ALTER TABLE "OrphanActivityExecution" DROP CONSTRAINT "OrphanActivityExecution_activityExecutionInfoId_fkey";

-- AlterTable
ALTER TABLE "ActivityExecutionInfo" DROP COLUMN "userId",
ADD COLUMN     "executorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "BehaviorInfo" ADD COLUMN     "orphanId" INTEGER;

-- AlterTable
ALTER TABLE "OrphanActivityExecution" ADD COLUMN     "isAttended" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "GoalEvaluation_goalId_activityExecutionInfoId_key" ON "GoalEvaluation"("goalId", "activityExecutionInfoId");

-- AddForeignKey
ALTER TABLE "ActivityGoal" ADD CONSTRAINT "ActivityGoal_activityInfoId_fkey" FOREIGN KEY ("activityInfoId") REFERENCES "ActivityInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalEvaluation" ADD CONSTRAINT "GoalEvaluation_activityExecutionInfoId_fkey" FOREIGN KEY ("activityExecutionInfoId") REFERENCES "ActivityExecutionInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityExecutionInfo" ADD CONSTRAINT "ActivityExecutionInfo_executorId_fkey" FOREIGN KEY ("executorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrphanActivityExecution" ADD CONSTRAINT "OrphanActivityExecution_activityExecutionInfoId_fkey" FOREIGN KEY ("activityExecutionInfoId") REFERENCES "ActivityExecutionInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BehaviorInfo" ADD CONSTRAINT "BehaviorInfo_orphanId_fkey" FOREIGN KEY ("orphanId") REFERENCES "Orphan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
