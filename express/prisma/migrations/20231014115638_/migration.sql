/*
  Warnings:

  - Added the required column `teamLeaderEmail` to the `Posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamLeaderName` to the `Posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamLeaderPhone` to the `Posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamName` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Posts` ADD COLUMN `teamLeaderEmail` VARCHAR(191) NOT NULL,
    ADD COLUMN `teamLeaderName` VARCHAR(191) NOT NULL,
    ADD COLUMN `teamLeaderPhone` VARCHAR(191) NOT NULL,
    ADD COLUMN `teamName` VARCHAR(191) NOT NULL;
