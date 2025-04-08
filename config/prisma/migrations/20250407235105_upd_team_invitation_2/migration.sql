/*
  Warnings:

  - Made the column `inviteeEmail` on table `TeamInvitation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TeamInvitation" ALTER COLUMN "inviteeEmail" SET NOT NULL;
