-- CreateEnum
CREATE TYPE "Degree" AS ENUM ('EXCELLENT', 'VERY_GOOD', 'GOOD', 'ACCEPTED', 'FAIL');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('Attendance', 'Sponsorship', 'Behavior', 'Health', 'Activity', 'ActivityExecution');

-- CreateEnum
CREATE TYPE "Quarter" AS ENUM ('First', 'Second', 'Third', 'Fourth');

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrphanAttendance" DROP CONSTRAINT "OrphanAttendance_attendanceId_fkey";

-- AlterTable
ALTER TABLE "EmergencyContactInfo" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Orphan" ADD COLUMN     "roomId" INTEGER,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "OrphanAttendance" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Sponsorship" ADD COLUMN     "userId" INTEGER;

-- CreateTable
CREATE TABLE "HealthInfo" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "disease" TEXT,
    "description" TEXT,
    "orphanId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "HealthInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationInfo" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "scoreSheet" TEXT,
    "degree" "Degree" NOT NULL,
    "schoolName" TEXT,
    "orphanId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "EducationInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BehaviorInfo" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "userId" INTEGER,

    CONSTRAINT "BehaviorInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Criteria" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Criteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BehaviorCriteria" (
    "id" SERIAL NOT NULL,
    "evaluation" DOUBLE PRECISION NOT NULL,
    "criteriaId" INTEGER,
    "behaviorInfoId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "BehaviorCriteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "wing" TEXT,
    "capacity" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3),
    "type" "NotificationType",
    "userId" INTEGER,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityInfo" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "budget" DOUBLE PRECISION,
    "target" TEXT,
    "type" TEXT,
    "quarter" "Quarter" NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "ActivityInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnAchievedActivity" (
    "id" SERIAL NOT NULL,
    "note" TEXT,
    "activityInfoId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "UnAchievedActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityGoal" (
    "id" SERIAL NOT NULL,
    "activityInfoId" INTEGER,
    "goalTitleId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "ActivityGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoalTitle" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "GoalTitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoalInfo" (
    "id" SERIAL NOT NULL,
    "evaluation" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "activityGoalId" INTEGER,
    "activityExecutionInfoId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "GoalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityExecutionInfo" (
    "id" SERIAL NOT NULL,
    "cost" DOUBLE PRECISION,
    "description" TEXT,
    "startDate" TIMESTAMP(3),
    "note" TEXT,
    "userId" INTEGER NOT NULL,
    "activityInfoId" INTEGER NOT NULL,

    CONSTRAINT "ActivityExecutionInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrphanActivityExecution" (
    "id" SERIAL NOT NULL,
    "evaluation" DOUBLE PRECISION,
    "activityExecutionInfoId" INTEGER,
    "orphanId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "OrphanActivityExecution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orphan" ADD CONSTRAINT "Orphan_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orphan" ADD CONSTRAINT "Orphan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyContactInfo" ADD CONSTRAINT "EmergencyContactInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsorship" ADD CONSTRAINT "Sponsorship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrphanAttendance" ADD CONSTRAINT "OrphanAttendance_attendanceId_fkey" FOREIGN KEY ("attendanceId") REFERENCES "Attendance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrphanAttendance" ADD CONSTRAINT "OrphanAttendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthInfo" ADD CONSTRAINT "HealthInfo_orphanId_fkey" FOREIGN KEY ("orphanId") REFERENCES "Orphan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthInfo" ADD CONSTRAINT "HealthInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EducationInfo" ADD CONSTRAINT "EducationInfo_orphanId_fkey" FOREIGN KEY ("orphanId") REFERENCES "Orphan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EducationInfo" ADD CONSTRAINT "EducationInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BehaviorInfo" ADD CONSTRAINT "BehaviorInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Criteria" ADD CONSTRAINT "Criteria_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BehaviorCriteria" ADD CONSTRAINT "BehaviorCriteria_criteriaId_fkey" FOREIGN KEY ("criteriaId") REFERENCES "Criteria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BehaviorCriteria" ADD CONSTRAINT "BehaviorCriteria_behaviorInfoId_fkey" FOREIGN KEY ("behaviorInfoId") REFERENCES "BehaviorInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BehaviorCriteria" ADD CONSTRAINT "BehaviorCriteria_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityInfo" ADD CONSTRAINT "ActivityInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnAchievedActivity" ADD CONSTRAINT "UnAchievedActivity_activityInfoId_fkey" FOREIGN KEY ("activityInfoId") REFERENCES "ActivityInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnAchievedActivity" ADD CONSTRAINT "UnAchievedActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityGoal" ADD CONSTRAINT "ActivityGoal_activityInfoId_fkey" FOREIGN KEY ("activityInfoId") REFERENCES "ActivityInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityGoal" ADD CONSTRAINT "ActivityGoal_goalTitleId_fkey" FOREIGN KEY ("goalTitleId") REFERENCES "GoalTitle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityGoal" ADD CONSTRAINT "ActivityGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalTitle" ADD CONSTRAINT "GoalTitle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalInfo" ADD CONSTRAINT "GoalInfo_activityGoalId_fkey" FOREIGN KEY ("activityGoalId") REFERENCES "ActivityGoal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalInfo" ADD CONSTRAINT "GoalInfo_activityExecutionInfoId_fkey" FOREIGN KEY ("activityExecutionInfoId") REFERENCES "ActivityExecutionInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalInfo" ADD CONSTRAINT "GoalInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityExecutionInfo" ADD CONSTRAINT "ActivityExecutionInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityExecutionInfo" ADD CONSTRAINT "ActivityExecutionInfo_activityInfoId_fkey" FOREIGN KEY ("activityInfoId") REFERENCES "ActivityInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrphanActivityExecution" ADD CONSTRAINT "OrphanActivityExecution_activityExecutionInfoId_fkey" FOREIGN KEY ("activityExecutionInfoId") REFERENCES "ActivityExecutionInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrphanActivityExecution" ADD CONSTRAINT "OrphanActivityExecution_orphanId_fkey" FOREIGN KEY ("orphanId") REFERENCES "Orphan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrphanActivityExecution" ADD CONSTRAINT "OrphanActivityExecution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
