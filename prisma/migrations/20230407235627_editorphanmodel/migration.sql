/*
  Warnings:

  - You are about to drop the column `age` on the `Orphan` table. All the data in the column will be lost.
  - You are about to drop the column `birthplace` on the `Orphan` table. All the data in the column will be lost.
  - You are about to drop the column `currentAddress` on the `Orphan` table. All the data in the column will be lost.
  - You are about to drop the column `evaluation` on the `Orphan` table. All the data in the column will be lost.
  - You are about to drop the column `fatherDeathCos` on the `Orphan` table. All the data in the column will be lost.
  - You are about to drop the column `fatherDeathDate` on the `Orphan` table. All the data in the column will be lost.
  - You are about to drop the column `fatherWork` on the `Orphan` table. All the data in the column will be lost.
  - You are about to drop the column `females` on the `Orphan` table. All the data in the column will be lost.
  - You are about to drop the column `foundationAmount` on the `Orphan` table. All the data in the column will be lost.
  - You are about to drop the column `foundationName` on the `Orphan` table. All the data in the column will be lost.
  - You are about to drop the column `joinDate` on the `Orphan` table. All the data in the column will be lost.
  - You are about to drop the column `lastYearPercentage` on the `Orphan` table. All the data in the column will be lost.
  - You are about to drop the column `liveWith` on the `Orphan` table. All the data in the column will be lost.
  - You are about to drop the column `males` on the `Orphan` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyIncom` on the `Orphan` table. All the data in the column will be lost.
  - You are about to drop the column `motherJob` on the `Orphan` table. All the data in the column will be lost.
  - You are about to drop the column `motherJobPhone` on the `Orphan` table. All the data in the column will be lost.
  - You are about to drop the column `motherName` on the `Orphan` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Orphan` table. All the data in the column will be lost.
  - You are about to drop the column `noOfFamilyMembers` on the `Orphan` table. All the data in the column will be lost.
  - You are about to drop the column `schoolName` on the `Orphan` table. All the data in the column will be lost.
  - Made the column `name` on table `EmergencyContactInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `EmergencyContactInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orphanId` on table `EmergencyContactInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Guardian` required. This step will fail if there are existing NULL values in that column.
  - Made the column `relationship` on table `Guardian` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Guardian` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Guardian` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthdate` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gradeLevel` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `homePhone` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isSponsored` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Orphan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "HomeType" AS ENUM ('RENT', 'OWNED');

-- DropForeignKey
ALTER TABLE "EmergencyContactInfo" DROP CONSTRAINT "EmergencyContactInfo_orphanId_fkey";

-- DropForeignKey
ALTER TABLE "Guardian" DROP CONSTRAINT "Guardian_userId_fkey";

-- AlterTable
ALTER TABLE "EmergencyContactInfo" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "orphanId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Guardian" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "relationship" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Orphan" DROP COLUMN "age",
DROP COLUMN "birthplace",
DROP COLUMN "currentAddress",
DROP COLUMN "evaluation",
DROP COLUMN "fatherDeathCos",
DROP COLUMN "fatherDeathDate",
DROP COLUMN "fatherWork",
DROP COLUMN "females",
DROP COLUMN "foundationAmount",
DROP COLUMN "foundationName",
DROP COLUMN "joinDate",
DROP COLUMN "lastYearPercentage",
DROP COLUMN "liveWith",
DROP COLUMN "males",
DROP COLUMN "monthlyIncom",
DROP COLUMN "motherJob",
DROP COLUMN "motherJobPhone",
DROP COLUMN "motherName",
DROP COLUMN "name",
DROP COLUMN "noOfFamilyMembers",
DROP COLUMN "schoolName",
ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "birthdate" SET NOT NULL,
ALTER COLUMN "gradeLevel" SET NOT NULL,
ALTER COLUMN "homePhone" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "isSponsored" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "homeType" SET NOT NULL,
ALTER COLUMN "homeType" DROP DEFAULT,
ALTER COLUMN "homeType" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "userName" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "type" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Guardian" ADD CONSTRAINT "Guardian_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyContactInfo" ADD CONSTRAINT "EmergencyContactInfo_orphanId_fkey" FOREIGN KEY ("orphanId") REFERENCES "Orphan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
