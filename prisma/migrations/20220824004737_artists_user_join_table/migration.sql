/*
  Warnings:

  - You are about to drop the column `userId` on the `ArtistFollowing` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArtistFollowing" DROP CONSTRAINT "ArtistFollowing_userId_fkey";

-- AlterTable
ALTER TABLE "ArtistFollowing" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "ArtistUsersJoin" (
    "userId" TEXT NOT NULL,
    "artistId" INTEGER NOT NULL,

    CONSTRAINT "ArtistUsersJoin_pkey" PRIMARY KEY ("userId","artistId")
);

-- AddForeignKey
ALTER TABLE "ArtistUsersJoin" ADD CONSTRAINT "ArtistUsersJoin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("googleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistUsersJoin" ADD CONSTRAINT "ArtistUsersJoin_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "ArtistFollowing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
