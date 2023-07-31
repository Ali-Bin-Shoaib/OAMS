/*
  Warnings:

  - The `target` column on the `ActivityInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "User_username_password_key";

-- AlterTable
ALTER TABLE "ActivityInfo" DROP COLUMN "target",
ADD COLUMN     "target" "Grade";
