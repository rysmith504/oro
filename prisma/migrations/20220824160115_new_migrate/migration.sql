-- DropForeignKey
ALTER TABLE "ArtistFollowing" DROP CONSTRAINT "ArtistFollowing_userId_fkey";

-- AlterTable
ALTER TABLE "ArtistFollowing" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ArtistFollowing" ADD CONSTRAINT "ArtistFollowing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("googleId") ON DELETE SET NULL ON UPDATE CASCADE;
