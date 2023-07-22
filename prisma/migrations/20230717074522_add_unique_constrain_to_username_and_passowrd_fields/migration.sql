/*
  Warnings:

  - A unique constraint covering the columns `[username,password]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_username_password_key" ON "User"("username", "password");
