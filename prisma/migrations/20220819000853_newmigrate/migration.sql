/*
  Warnings:

  - You are about to drop the column `notificationsId` on the `Comments` table. All the data in the column will be lost.
  - Added the required column `commentId` to the `Notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_notificationsId_fkey";

-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_userId_fkey";

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "notificationsId";

-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN     "commentId" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("googleId") ON DELETE RESTRICT ON UPDATE CASCADE;
