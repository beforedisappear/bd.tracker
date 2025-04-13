/*
  Warnings:

  - You are about to drop the column `teamId` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `Column` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `Sticker` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `Task` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `Column` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Sticker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "teamId";

-- AlterTable
ALTER TABLE "Column" DROP COLUMN "teamId",
ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sticker" DROP COLUMN "teamId",
ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "teamId",
ADD COLUMN     "projectId" TEXT NOT NULL;
