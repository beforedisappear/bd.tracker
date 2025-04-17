/*
  Warnings:

  - You are about to drop the column `inviteeId` on the `TeamInvitation` table. All the data in the column will be lost.
  - You are about to drop the `_TeamUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PermissionType" ADD VALUE 'TASK_ACCOMPLISHMENT';
ALTER TYPE "PermissionType" ADD VALUE 'TASK_ARCHIVING';

-- DropForeignKey
ALTER TABLE "TeamInvitation" DROP CONSTRAINT "TeamInvitation_inviteeId_fkey";

-- DropForeignKey
ALTER TABLE "_TeamUsers" DROP CONSTRAINT "_TeamUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_TeamUsers" DROP CONSTRAINT "_TeamUsers_B_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "isDone" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isInArchieve" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TeamInvitation" DROP COLUMN "inviteeId";

-- DropTable
DROP TABLE "_TeamUsers";

-- CreateTable
CREATE TABLE "_TeamMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TeamMembers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_TeamAdmins" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TeamAdmins_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TeamMembers_B_index" ON "_TeamMembers"("B");

-- CreateIndex
CREATE INDEX "_TeamAdmins_B_index" ON "_TeamAdmins"("B");

-- AddForeignKey
ALTER TABLE "_TeamMembers" ADD CONSTRAINT "_TeamMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamMembers" ADD CONSTRAINT "_TeamMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamAdmins" ADD CONSTRAINT "_TeamAdmins_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamAdmins" ADD CONSTRAINT "_TeamAdmins_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
