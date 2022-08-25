/*
  Warnings:

  - You are about to drop the `ArtistUsersJoin` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `ArtistFollowing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ArtistUsersJoin" DROP CONSTRAINT "ArtistUsersJoin_artistId_fkey";

-- DropForeignKey
ALTER TABLE "ArtistUsersJoin" DROP CONSTRAINT "ArtistUsersJoin_userId_fkey";

-- AlterTable
ALTER TABLE "ArtistFollowing" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ArtistUsersJoin";

-- AddForeignKey
ALTER TABLE "ArtistFollowing" ADD CONSTRAINT "ArtistFollowing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
