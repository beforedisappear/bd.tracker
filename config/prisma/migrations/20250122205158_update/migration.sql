-- AlterTable
ALTER TABLE "jwt" ADD CONSTRAINT "jwt_pkey" PRIMARY KEY ("token");

-- DropIndex
DROP INDEX "jwt_token_key";
