/*
  Warnings:

  - Added the required column `token` to the `TeamInvitation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeamInvitation" ADD COLUMN     "token" TEXT NOT NULL;
