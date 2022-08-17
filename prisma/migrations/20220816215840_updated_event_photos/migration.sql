/*
  Warnings:

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
ALTER TABLE "EventPhotos" DROP CONSTRAINT "EventPhotos_commentsId_fkey";

-- AlterTable
ALTER TABLE "ArtistFollowing" ALTER COLUMN "bio" SET NOT NULL,
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
ALTER TABLE "EventPhotos" ALTER COLUMN "deleteToken" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "commentsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "EventPhotos" ADD CONSTRAINT "EventPhotos_commentsId_fkey" FOREIGN KEY ("commentsId") REFERENCES "Comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
