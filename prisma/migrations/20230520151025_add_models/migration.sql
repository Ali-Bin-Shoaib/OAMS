/*
  Warnings:

  - You are about to drop the column `name` on the `Guardian` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Guardian` table. All the data in the column will be lost.
  - Made the column `gender` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthdate` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isMotherWorks` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gradeLevel` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `guardianId` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isSponsored` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `homeType` to the `Orphan` table without a default value. This is not possible if the table is not empty.
  - Made the column `age` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthplace` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currentAddress` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fatherDeathDate` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `females` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `joinDate` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastYearPercentage` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `liveWith` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `males` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `motherName` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `motherStatus` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `schoolName` on table `Orphan` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'TRANSACTION');

-- CreateEnum
CREATE TYPE "SponsorshipPeriod" AS ENUM ('ONE_YEAR', 'TWO_YEAR');

-- DropForeignKey
ALTER TABLE "Orphan" DROP CONSTRAINT "Orphan_guardianId_fkey";

-- AlterTable
ALTER TABLE "Guardian" DROP COLUMN "name",
DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "Orphan" ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "birthdate" SET NOT NULL,
ALTER COLUMN "isMotherWorks" SET NOT NULL,
ALTER COLUMN "gradeLevel" SET NOT NULL,
ALTER COLUMN "guardianId" SET NOT NULL,
ALTER COLUMN "isSponsored" SET NOT NULL,
ALTER COLUMN "isSponsored" SET DEFAULT false,
DROP COLUMN "homeType",
ADD COLUMN     "homeType" "HomeType" NOT NULL,
ALTER COLUMN "age" SET NOT NULL,
ALTER COLUMN "birthplace" SET NOT NULL,
ALTER COLUMN "currentAddress" SET NOT NULL,
ALTER COLUMN "fatherDeathDate" SET NOT NULL,
ALTER COLUMN "females" SET NOT NULL,
ALTER COLUMN "joinDate" SET NOT NULL,
ALTER COLUMN "lastYearPercentage" SET NOT NULL,
ALTER COLUMN "liveWith" SET NOT NULL,
ALTER COLUMN "males" SET NOT NULL,
ALTER COLUMN "motherName" SET NOT NULL,
ALTER COLUMN "motherStatus" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "schoolName" SET NOT NULL,
ALTER COLUMN "image" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Sponsor" (
    "id" SERIAL NOT NULL,
    "birthdate" TIMESTAMP(3),
    "fax" TEXT,
    "identityNumber" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sponsorship" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "sponsorshipPeriod" "SponsorshipPeriod" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "sponsorId" INTEGER NOT NULL,
    "orphanId" INTEGER NOT NULL,

    CONSTRAINT "Sponsorship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrphanAttendance" (
    "id" SERIAL NOT NULL,
    "isAttended" BOOLEAN NOT NULL DEFAULT true,
    "absentReason" TEXT,
    "notes" TEXT,
    "returnDay" TEXT,
    "justification" TEXT,
    "attendanceId" INTEGER NOT NULL,
    "orphanId" INTEGER NOT NULL,

    CONSTRAINT "OrphanAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sponsor_userId_key" ON "Sponsor"("userId");

-- AddForeignKey
ALTER TABLE "Orphan" ADD CONSTRAINT "Orphan_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "Guardian"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsorship" ADD CONSTRAINT "Sponsorship_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "Sponsor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsorship" ADD CONSTRAINT "Sponsorship_orphanId_fkey" FOREIGN KEY ("orphanId") REFERENCES "Orphan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrphanAttendance" ADD CONSTRAINT "OrphanAttendance_attendanceId_fkey" FOREIGN KEY ("attendanceId") REFERENCES "Attendance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrphanAttendance" ADD CONSTRAINT "OrphanAttendance_orphanId_fkey" FOREIGN KEY ("orphanId") REFERENCES "Orphan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
