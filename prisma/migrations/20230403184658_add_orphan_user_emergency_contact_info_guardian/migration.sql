/*
  Warnings:

  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `isMotherWorks` on table `Orphan` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DEAD', 'MARRIED');

-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'EIGHTH', 'NINTH');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'ACTIVITY_SUPERVISOR', 'EDUCATION_SUPERVISOR', 'HEALTH_SUPERVISOR', 'BEHAVIOR_SUPERVISOR', 'ORPHANAGE_SUPERVISOR', 'SPONSOR', 'GUARDIAN');

-- AlterTable
ALTER TABLE "Orphan" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "fatherDeathCos" TEXT,
ADD COLUMN     "fatherWork" TEXT,
ADD COLUMN     "females" INTEGER,
ADD COLUMN     "foundationAmount" DOUBLE PRECISION,
ADD COLUMN     "foundationName" TEXT,
ADD COLUMN     "gradeLevel" "Grade",
ADD COLUMN     "guardianId" INTEGER,
ADD COLUMN     "homePhone" TEXT,
ADD COLUMN     "homeType" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "isSponsored" BOOLEAN,
ADD COLUMN     "lastYearPercentage" DOUBLE PRECISION,
ADD COLUMN     "males" INTEGER,
ADD COLUMN     "monthlyIncom" DOUBLE PRECISION,
ADD COLUMN     "motherJobPhone" INTEGER,
ADD COLUMN     "noOfFamilyMembers" INTEGER,
ADD COLUMN     "schoolName" TEXT,
ADD COLUMN     "status" "Status",
ADD COLUMN     "total" INTEGER,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "birthdate" DROP NOT NULL,
ALTER COLUMN "birthdate" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "fatherDeathDate" DROP NOT NULL,
ALTER COLUMN "fatherDeathDate" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "isMotherWorks" SET NOT NULL,
ALTER COLUMN "isMotherWorks" SET DEFAULT false;

-- DropTable
DROP TABLE "Note";

-- CreateTable
CREATE TABLE "Guardian" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "relationship" TEXT,
    "phone" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Guardian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyContactInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "orphanId" INTEGER,

    CONSTRAINT "EmergencyContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "gender" "Gender",
    "userName" TEXT,
    "password" TEXT,
    "email" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "type" "UserType",

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guardian_userId_key" ON "Guardian"("userId");

-- AddForeignKey
ALTER TABLE "Orphan" ADD CONSTRAINT "Orphan_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "Guardian"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guardian" ADD CONSTRAINT "Guardian_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyContactInfo" ADD CONSTRAINT "EmergencyContactInfo_orphanId_fkey" FOREIGN KEY ("orphanId") REFERENCES "Orphan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
