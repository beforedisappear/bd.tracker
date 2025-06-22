/*
  Warnings:

  - You are about to drop the column `nextColumnId` on the `Column` table. All the data in the column will be lost.
  - You are about to drop the column `nextTaskId` on the `Task` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Column" DROP CONSTRAINT "Column_nextColumnId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_nextTaskId_fkey";

-- DropIndex
DROP INDEX "Column_nextColumnId_key";

-- DropIndex
DROP INDEX "Task_nextTaskId_key";

-- AlterTable
ALTER TABLE "Column" DROP COLUMN "nextColumnId",
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "nextTaskId",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
