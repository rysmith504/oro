/*
  Warnings:

  - You are about to drop the column `picture` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `FriendsJoin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PoiTrips` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PoiUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PoiVotes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Points` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trips` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TripsUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PointsToTags` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[fbId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[instaId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[twitterId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[snapchatId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fbId` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instaId` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `snapchatId` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twitterId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FriendsJoin" DROP CONSTRAINT "FriendsJoin_friendId_fkey";

-- DropForeignKey
ALTER TABLE "FriendsJoin" DROP CONSTRAINT "FriendsJoin_usersId_fkey";

-- DropForeignKey
ALTER TABLE "PoiTrips" DROP CONSTRAINT "PoiTrips_poiId_fkey";

-- DropForeignKey
ALTER TABLE "PoiTrips" DROP CONSTRAINT "PoiTrips_tripsId_fkey";

-- DropForeignKey
ALTER TABLE "PoiUsers" DROP CONSTRAINT "PoiUsers_poiId_fkey";

-- DropForeignKey
ALTER TABLE "PoiUsers" DROP CONSTRAINT "PoiUsers_usersId_fkey";

-- DropForeignKey
ALTER TABLE "PoiVotes" DROP CONSTRAINT "PoiVotes_poiId_fkey";

-- DropForeignKey
ALTER TABLE "PoiVotes" DROP CONSTRAINT "PoiVotes_usersId_fkey";

-- DropForeignKey
ALTER TABLE "Trips" DROP CONSTRAINT "Trips_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "TripsUsers" DROP CONSTRAINT "TripsUsers_tripsId_fkey";

-- DropForeignKey
ALTER TABLE "TripsUsers" DROP CONSTRAINT "TripsUsers_usersId_fkey";

-- DropForeignKey
ALTER TABLE "_PointsToTags" DROP CONSTRAINT "_PointsToTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_PointsToTags" DROP CONSTRAINT "_PointsToTags_B_fkey";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "picture",
ADD COLUMN     "fbId" TEXT NOT NULL,
ADD COLUMN     "instaId" TEXT NOT NULL,
ADD COLUMN     "profileURL" TEXT,
ADD COLUMN     "snapchatId" TEXT NOT NULL,
ADD COLUMN     "twitterId" TEXT NOT NULL;

-- DropTable
DROP TABLE "FriendsJoin";

-- DropTable
DROP TABLE "PoiTrips";

-- DropTable
DROP TABLE "PoiUsers";

-- DropTable
DROP TABLE "PoiVotes";

-- DropTable
DROP TABLE "Points";

-- DropTable
DROP TABLE "Tags";

-- DropTable
DROP TABLE "Trips";

-- DropTable
DROP TABLE "TripsUsers";

-- DropTable
DROP TABLE "_PointsToTags";

-- CreateTable
CREATE TABLE "UserEvents" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventAPIid" TEXT NOT NULL,

    CONSTRAINT "UserEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtistFollowing" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "artistName" TEXT NOT NULL,

    CONSTRAINT "ArtistFollowing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventPhotos" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "deleteToken" TEXT NOT NULL,
    "eventAPIid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "commentsId" INTEGER NOT NULL,

    CONSTRAINT "EventPhotos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "notificationsId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_fbId_key" ON "Users"("fbId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_instaId_key" ON "Users"("instaId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_twitterId_key" ON "Users"("twitterId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_snapchatId_key" ON "Users"("snapchatId");

-- AddForeignKey
ALTER TABLE "UserEvents" ADD CONSTRAINT "UserEvents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistFollowing" ADD CONSTRAINT "ArtistFollowing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPhotos" ADD CONSTRAINT "EventPhotos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPhotos" ADD CONSTRAINT "EventPhotos_commentsId_fkey" FOREIGN KEY ("commentsId") REFERENCES "Comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_notificationsId_fkey" FOREIGN KEY ("notificationsId") REFERENCES "Notifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
