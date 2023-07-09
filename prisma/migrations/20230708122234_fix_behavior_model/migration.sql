-- DropForeignKey
ALTER TABLE "BehaviorCriteria" DROP CONSTRAINT "BehaviorCriteria_criteriaId_fkey";

-- AddForeignKey
ALTER TABLE "BehaviorCriteria" ADD CONSTRAINT "BehaviorCriteria_criteriaId_fkey" FOREIGN KEY ("criteriaId") REFERENCES "Criteria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
