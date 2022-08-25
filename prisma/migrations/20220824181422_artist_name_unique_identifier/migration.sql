/*
  Warnings:

  - A unique constraint covering the columns `[artistName]` on the table `ArtistFollowing` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ArtistFollowing_artistName_key" ON "ArtistFollowing"("artistName");
