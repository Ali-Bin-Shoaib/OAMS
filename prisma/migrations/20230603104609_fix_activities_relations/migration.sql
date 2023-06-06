/*
  Warnings:

  - You are about to drop the column `activityExecutionInfoId` on the `ActivityGoal` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `ActivityGoal` table. All the data in the column will be lost.
  - You are about to drop the column `evaluation` on the `ActivityGoal` table. All the data in the column will be lost.
  - You are about to drop the column `goalInfoId` on the `ActivityGoal` table. All the data in the column will be lost.
  - You are about to drop the `GoalInfo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[goalId,activityInfoId]` on the table `ActivityGoal` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ActivityExecutionInfo" DROP CONSTRAINT "ActivityExecutionInfo_activityInfoId_fkey";

-- DropForeignKey
ALTER TABLE "ActivityGoal" DROP CONSTRAINT "ActivityGoal_activityExecutionInfoId_fkey";

-- DropForeignKey
ALTER TABLE "ActivityGoal" DROP CONSTRAINT "ActivityGoal_goalInfoId_fkey";

-- DropForeignKey
ALTER TABLE "GoalInfo" DROP CONSTRAINT "GoalInfo_userId_fkey";

-- DropIndex
DROP INDEX "ActivityGoal_goalInfoId_activityInfoId_key";

-- AlterTable
ALTER TABLE "ActivityExecutionInfo" ALTER COLUMN "activityInfoId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ActivityGoal" DROP COLUMN "activityExecutionInfoId",
DROP COLUMN "date",
DROP COLUMN "evaluation",
DROP COLUMN "goalInfoId",
ADD COLUMN     "goalId" INTEGER;

-- DropTable
DROP TABLE "GoalInfo";

-- CreateTable
CREATE TABLE "Goal" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoalEvaluation" (
    "id" SERIAL NOT NULL,
    "evaluation" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activityExecutionInfoId" INTEGER NOT NULL,
    "goalId" INTEGER NOT NULL,

    CONSTRAINT "GoalEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActivityGoal_goalId_activityInfoId_key" ON "ActivityGoal"("goalId", "activityInfoId");

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityGoal" ADD CONSTRAINT "ActivityGoal_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalEvaluation" ADD CONSTRAINT "GoalEvaluation_activityExecutionInfoId_fkey" FOREIGN KEY ("activityExecutionInfoId") REFERENCES "ActivityExecutionInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalEvaluation" ADD CONSTRAINT "GoalEvaluation_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityExecutionInfo" ADD CONSTRAINT "ActivityExecutionInfo_activityInfoId_fkey" FOREIGN KEY ("activityInfoId") REFERENCES "ActivityInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
