-- DropForeignKey
ALTER TABLE "EventPhotos" DROP CONSTRAINT "EventPhotos_userId_fkey";

-- AlterTable
ALTER TABLE "EventPhotos" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "EventPhotos" ADD CONSTRAINT "EventPhotos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("googleId") ON DELETE RESTRICT ON UPDATE CASCADE;
