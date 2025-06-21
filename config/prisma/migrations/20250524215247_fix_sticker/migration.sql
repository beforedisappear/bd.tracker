/*
  Warnings:

  - You are about to drop the column `endDate` on the `Sticker` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Sticker` table. All the data in the column will be lost.
  - You are about to drop the column `textValue` on the `Sticker` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Sticker` table. All the data in the column will be lost.
  - Made the column `name` on table `Sticker` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Sticker" DROP COLUMN "endDate",
DROP COLUMN "startDate",
DROP COLUMN "textValue",
DROP COLUMN "type",
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3);

-- DropEnum
DROP TYPE "StickerType";
