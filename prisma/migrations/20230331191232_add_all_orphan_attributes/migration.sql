-- AlterTable
ALTER TABLE "Orphan" ADD COLUMN     "birthplace" TEXT,
ADD COLUMN     "currentAddress" TEXT,
ADD COLUMN     "evaluation" DOUBLE PRECISION,
ADD COLUMN     "fatherDeathDate" DATE,
ADD COLUMN     "isMotherWorks" BOOLEAN,
ADD COLUMN     "liveWith" TEXT,
ADD COLUMN     "motherJob" TEXT,
ADD COLUMN     "motherName" TEXT;

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);
