/*
  Warnings:

  - Added the required column `displayUsername` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "displayUsername" TEXT NOT NULL,
ALTER COLUMN "username" SET NOT NULL;
