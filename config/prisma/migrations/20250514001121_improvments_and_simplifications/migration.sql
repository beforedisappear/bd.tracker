/*
  Warnings:

  - The values [DATE] on the enum `StickerType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `boardPosition` on the `Column` table. All the data in the column will be lost.
  - You are about to drop the column `columnPosition` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `isInArchieve` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `isStandalone` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `isSubtask` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `parentTaskId` on the `Task` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nextColumnId]` on the table `Column` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nextTaskId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StickerType_new" AS ENUM ('TEXT', 'DATE_RANGE');
ALTER TABLE "Sticker" ALTER COLUMN "type" TYPE "StickerType_new" USING ("type"::text::"StickerType_new");
ALTER TYPE "StickerType" RENAME TO "StickerType_old";
ALTER TYPE "StickerType_new" RENAME TO "StickerType";
DROP TYPE "StickerType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_parentTaskId_fkey";

-- DropIndex
DROP INDEX "Column_boardPosition_key";

-- DropIndex
DROP INDEX "Task_columnPosition_key";

-- AlterTable
ALTER TABLE "Column" DROP COLUMN "boardPosition",
ADD COLUMN     "nextColumnId" TEXT;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "columnPosition",
DROP COLUMN "isInArchieve",
DROP COLUMN "isStandalone",
DROP COLUMN "isSubtask",
DROP COLUMN "parentTaskId",
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nextTaskId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Column_nextColumnId_key" ON "Column"("nextColumnId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_nextTaskId_key" ON "Task"("nextTaskId");

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_nextColumnId_fkey" FOREIGN KEY ("nextColumnId") REFERENCES "Column"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_nextTaskId_fkey" FOREIGN KEY ("nextTaskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
