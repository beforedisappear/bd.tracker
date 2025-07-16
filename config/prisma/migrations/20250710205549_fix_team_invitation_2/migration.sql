/*
  Warnings:

  - A unique constraint covering the columns `[teamId,inviteeEmail]` on the table `TeamInvitation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TeamInvitation_teamId_inviteeEmail_key" ON "TeamInvitation"("teamId", "inviteeEmail");
