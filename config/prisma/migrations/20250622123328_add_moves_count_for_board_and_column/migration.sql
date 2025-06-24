-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "columnMoveCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "taskMoveCount" INTEGER NOT NULL DEFAULT 0;
