/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Points" (
    "id" SERIAL NOT NULL,
    "photo" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalBudget" INTEGER NOT NULL,
    "currentFunds" INTEGER NOT NULL,
    "tagsId" INTEGER NOT NULL,

    CONSTRAINT "Points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trips" (
    "id" SERIAL NOT NULL,
    "photo" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalBudget" INTEGER NOT NULL,
    "currentFunds" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "id" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "picture" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PoiTrips" (
    "tripsId" INTEGER NOT NULL,
    "poiId" INTEGER NOT NULL,

    CONSTRAINT "PoiTrips_pkey" PRIMARY KEY ("tripsId","poiId")
);

-- CreateTable
CREATE TABLE "PoiVotes" (
    "usersId" INTEGER NOT NULL,
    "poiId" INTEGER NOT NULL,
    "votes" INTEGER NOT NULL,

    CONSTRAINT "PoiVotes_pkey" PRIMARY KEY ("poiId","usersId")
);

-- CreateTable
CREATE TABLE "PoiUsers" (
    "usersId" INTEGER NOT NULL,
    "poiId" INTEGER NOT NULL,

    CONSTRAINT "PoiUsers_pkey" PRIMARY KEY ("usersId","poiId")
);

-- CreateTable
CREATE TABLE "TripsUsers" (
    "usersId" INTEGER NOT NULL,
    "tripsId" INTEGER NOT NULL,
    "contributions" INTEGER NOT NULL,

    CONSTRAINT "TripsUsers_pkey" PRIMARY KEY ("usersId","tripsId")
);

-- CreateTable
CREATE TABLE "FriendsJoin" (
    "usersId" INTEGER NOT NULL,
    "friendId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "FriendsJoin_pkey" PRIMARY KEY ("usersId","friendId")
);

-- CreateTable
CREATE TABLE "_PointsToTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Points_title_key" ON "Points"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Trips_title_key" ON "Trips"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_PointsToTags_AB_unique" ON "_PointsToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_PointsToTags_B_index" ON "_PointsToTags"("B");

-- AddForeignKey
ALTER TABLE "Trips" ADD CONSTRAINT "Trips_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoiTrips" ADD CONSTRAINT "PoiTrips_tripsId_fkey" FOREIGN KEY ("tripsId") REFERENCES "Trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoiTrips" ADD CONSTRAINT "PoiTrips_poiId_fkey" FOREIGN KEY ("poiId") REFERENCES "Points"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoiVotes" ADD CONSTRAINT "PoiVotes_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoiVotes" ADD CONSTRAINT "PoiVotes_poiId_fkey" FOREIGN KEY ("poiId") REFERENCES "Points"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoiUsers" ADD CONSTRAINT "PoiUsers_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoiUsers" ADD CONSTRAINT "PoiUsers_poiId_fkey" FOREIGN KEY ("poiId") REFERENCES "Points"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripsUsers" ADD CONSTRAINT "TripsUsers_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripsUsers" ADD CONSTRAINT "TripsUsers_tripsId_fkey" FOREIGN KEY ("tripsId") REFERENCES "Trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendsJoin" ADD CONSTRAINT "FriendsJoin_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendsJoin" ADD CONSTRAINT "FriendsJoin_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PointsToTags" ADD CONSTRAINT "_PointsToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Points"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PointsToTags" ADD CONSTRAINT "_PointsToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
