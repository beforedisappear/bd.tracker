/*
  Warnings:

  - The values [TEAM_CREATE,TEAM_DELETE,TEAM_RENAME,TEAM_ADD_PROJECT,TEAM_REMOVE_PROJECT,TEAM_INVITE_USER,TEAM_REMOVE_USER] on the enum `PermissionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `teamId` on the `Role` table. All the data in the column will be lost.
  - The `color` column on the `Sticker` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `projectId` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Color" AS ENUM ('SLATE', 'ROSE', 'AMBER', 'YELLOW', 'LIME', 'GREEN', 'TEAL', 'SKY', 'INDIGO', 'VIOLET', 'GRAY', 'RED', 'ORANGE', 'GOLD', 'EMERALD');

-- AlterEnum
BEGIN;
CREATE TYPE "PermissionType_new" AS ENUM ('PROJECT_CREATE', 'PROJECT_DELETE', 'PROJECT_VIEW', 'PROJECT_INVITE_MEMBER', 'PROJECT_REMOVE_MEMBER', 'PROJECT_RENAME', 'PROJECT_CREATE_BOARD', 'PROJECT_REMOVE_BOARD', 'BOARD_CREATE', 'BOARD_RENAME', 'BOARD_DELETE', 'BOARD_VIEW', 'BOARD_MOVE', 'BOARD_ADD_COLUMN', 'BOARD_REMOVE_COLUMN', 'BOARD_CHANGE_STICKERS', 'BOARD_CREATE_STICKERS', 'BOARD_DELETE_STICERS', 'COLUMN_CREATE', 'COLUMN_DELETE', 'COLUMN_RENAME', 'COLUMN_REPOSITION', 'COLUMN_CREATE_TASK', 'COLUMN_DELETE_TASK', 'TASK_CREATE', 'TASK_VIEW', 'TASK_DELETE', 'TASK_ACCOMPLISHMENT', 'TASK_ARCHIVING', 'TASK_RENAME', 'TASK_CHANGE_DESCRIPTION', 'TASK_REPOSITION', 'TASK_MOVE', 'TASK_ASSIGN_USERS', 'TASK_SUBTASK_MANAGEMENT', 'TASK_ADD_STICKER', 'TASK_REMOVE_STICKER', 'STICKER_CREATE', 'STICKER_RENAME', 'STICKER_CHANGE_COLOR', 'STICKER_CHANGE_TYPE', 'STICKER_DELETE', 'USER_MANAGE_ROLES', 'USER_VIEW');
ALTER TABLE "Permission" ALTER COLUMN "type" TYPE "PermissionType_new" USING ("type"::text::"PermissionType_new");
ALTER TYPE "PermissionType" RENAME TO "PermissionType_old";
ALTER TYPE "PermissionType_new" RENAME TO "PermissionType";
DROP TYPE "PermissionType_old";
COMMIT;

-- DropIndex
DROP INDEX "Role_name_key";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "teamId",
ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sticker" DROP COLUMN "color",
ADD COLUMN     "color" "Color" NOT NULL DEFAULT 'GRAY';

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "color" "Color" NOT NULL DEFAULT 'GRAY';

-- CreateTable
CREATE TABLE "_ProjectMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProjectMembers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProjectMembers_B_index" ON "_ProjectMembers"("B");

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectMembers" ADD CONSTRAINT "_ProjectMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectMembers" ADD CONSTRAINT "_ProjectMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
