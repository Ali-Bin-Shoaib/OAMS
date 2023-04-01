-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "Orphan" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "gender" "Gender",
    "birthdate" DATE NOT NULL,
    "joinDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orphan_pkey" PRIMARY KEY ("id")
);
