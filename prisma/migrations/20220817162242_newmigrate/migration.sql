/*
  Warnings:

  - You are about to drop the column `commentsId` on the `EventPhotos` table. All the data in the column will be lost.
  - Added the required column `photoUrl` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_notificationsId_fkey";

-- DropForeignKey
ALTER TABLE "EventPhotos" DROP CONSTRAINT "EventPhotos_commentsId_fkey";

-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "photoUrl" TEXT NOT NULL,
ALTER COLUMN "notificationsId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "EventPhotos" DROP COLUMN "commentsId";

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_notificationsId_fkey" FOREIGN KEY ("notificationsId") REFERENCES "Notifications"("id") ON DELETE SET NULL ON UPDATE CASCADE;
