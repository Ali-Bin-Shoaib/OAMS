/*
  Warnings:

  - You are about to drop the column `status` on the `Orphan` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'ALIVE';

-- AlterTable
ALTER TABLE "Orphan" DROP COLUMN "status",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "birthplace" TEXT,
ADD COLUMN     "currentAddress" TEXT,
ADD COLUMN     "evaluation" DOUBLE PRECISION,
ADD COLUMN     "fatherDeathCos" TEXT,
ADD COLUMN     "fatherDeathDate" TIMESTAMP(3),
ADD COLUMN     "fatherWork" TEXT,
ADD COLUMN     "females" INTEGER,
ADD COLUMN     "foundationAmount" DOUBLE PRECISION,
ADD COLUMN     "foundationName" TEXT,
ADD COLUMN     "joinDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastYearPercentage" DOUBLE PRECISION,
ADD COLUMN     "liveWith" TEXT,
ADD COLUMN     "males" INTEGER,
ADD COLUMN     "monthlyIncom" DOUBLE PRECISION,
ADD COLUMN     "motherJob" TEXT,
ADD COLUMN     "motherJobPhone" TEXT,
ADD COLUMN     "motherName" TEXT,
ADD COLUMN     "motherStatus" "Status",
ADD COLUMN     "name" TEXT,
ADD COLUMN     "noOfFamilyMembers" INTEGER,
ADD COLUMN     "schoolName" TEXT,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "birthdate" DROP NOT NULL,
ALTER COLUMN "isMotherWorks" DROP NOT NULL,
ALTER COLUMN "gradeLevel" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;
