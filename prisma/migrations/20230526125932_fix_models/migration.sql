-- DropForeignKey
ALTER TABLE "OrphanAttendance" DROP CONSTRAINT "OrphanAttendance_orphanId_fkey";

-- DropForeignKey
ALTER TABLE "Sponsorship" DROP CONSTRAINT "Sponsorship_orphanId_fkey";

-- AlterTable
ALTER TABLE "OrphanAttendance" ALTER COLUMN "orphanId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Sponsorship" ADD CONSTRAINT "Sponsorship_orphanId_fkey" FOREIGN KEY ("orphanId") REFERENCES "Orphan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrphanAttendance" ADD CONSTRAINT "OrphanAttendance_orphanId_fkey" FOREIGN KEY ("orphanId") REFERENCES "Orphan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
