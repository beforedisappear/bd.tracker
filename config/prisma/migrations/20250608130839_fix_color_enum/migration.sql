/*
  Warnings:

  - The values [GOLD] on the enum `Color` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Color_new" AS ENUM ('SLATE', 'ROSE', 'AMBER', 'YELLOW', 'LIME', 'GREEN', 'TEAL', 'SKY', 'INDIGO', 'VIOLET', 'GRAY', 'RED', 'ORANGE', 'EMERALD');
ALTER TABLE "Sticker" ALTER COLUMN "color" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "color" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "color" TYPE "Color_new" USING ("color"::text::"Color_new");
ALTER TABLE "Sticker" ALTER COLUMN "color" TYPE "Color_new" USING ("color"::text::"Color_new");
ALTER TYPE "Color" RENAME TO "Color_old";
ALTER TYPE "Color_new" RENAME TO "Color";
DROP TYPE "Color_old";
ALTER TABLE "Sticker" ALTER COLUMN "color" SET DEFAULT 'GRAY';
ALTER TABLE "Task" ALTER COLUMN "color" SET DEFAULT 'GRAY';
COMMIT;
