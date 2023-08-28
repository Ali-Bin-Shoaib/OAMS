-- AlterTable
ALTER TABLE "OrphanActivityExecution" ADD COLUMN     "goalId" INTEGER;

-- AddForeignKey
ALTER TABLE "OrphanActivityExecution" ADD CONSTRAINT "OrphanActivityExecution_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
