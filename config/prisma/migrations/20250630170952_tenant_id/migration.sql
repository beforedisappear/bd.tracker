/*
  Warnings:

  - Added the required column `tenantId` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `Column` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `Sticker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "tenantId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "tenantId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sticker" ADD COLUMN     "tenantId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "tenantId" TEXT NOT NULL;
