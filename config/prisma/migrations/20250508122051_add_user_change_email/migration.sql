-- CreateTable
CREATE TABLE "user_email_change" (
    "id" TEXT NOT NULL,
    "newEmail" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "user_email_change_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_change_userId_key" ON "user_email_change"("userId");

-- AddForeignKey
ALTER TABLE "user_email_change" ADD CONSTRAINT "user_email_change_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
