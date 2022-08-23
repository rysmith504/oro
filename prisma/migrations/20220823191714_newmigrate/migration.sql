-- DropForeignKey
ALTER TABLE "ArtistFollowing" DROP CONSTRAINT "ArtistFollowing_userId_fkey";

-- AlterTable
ALTER TABLE "ArtistFollowing" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "ArtistFollowing" ADD CONSTRAINT "ArtistFollowing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("googleId") ON DELETE RESTRICT ON UPDATE CASCADE;
