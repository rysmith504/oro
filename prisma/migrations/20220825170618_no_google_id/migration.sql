/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[photoUrl]` on the table `Comments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `artistName` on table `ArtistFollowing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bio` on table `ArtistFollowing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `facebook` on table `ArtistFollowing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `homepage` on table `ArtistFollowing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `ArtistFollowing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `instagram` on table `ArtistFollowing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `itunes` on table `ArtistFollowing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ticketId` on table `ArtistFollowing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `twitter` on table `ArtistFollowing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `wiki` on table `ArtistFollowing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `youtube` on table `ArtistFollowing` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ArtistUsersJoin" DROP CONSTRAINT "ArtistUsersJoin_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "EventPhotos" DROP CONSTRAINT "EventPhotos_userId_fkey";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserEvents" DROP CONSTRAINT "UserEvents_userId_fkey";

-- DropIndex
DROP INDEX "Users_id_key";

-- AlterTable
ALTER TABLE "ArtistFollowing" ALTER COLUMN "artistName" SET NOT NULL,
ALTER COLUMN "bio" SET NOT NULL,
ALTER COLUMN "facebook" SET NOT NULL,
ALTER COLUMN "homepage" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "instagram" SET NOT NULL,
ALTER COLUMN "itunes" SET NOT NULL,
ALTER COLUMN "ticketId" SET NOT NULL,
ALTER COLUMN "twitter" SET NOT NULL,
ALTER COLUMN "wiki" SET NOT NULL,
ALTER COLUMN "youtube" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserEvents" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "id",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Users_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Comments_photoUrl_key" ON "Comments"("photoUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEvents" ADD CONSTRAINT "UserEvents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistUsersJoin" ADD CONSTRAINT "ArtistUsersJoin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPhotos" ADD CONSTRAINT "EventPhotos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
