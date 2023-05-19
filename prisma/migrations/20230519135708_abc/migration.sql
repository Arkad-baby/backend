/*
  Warnings:

  - You are about to drop the `commentReply` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "pages" ADD COLUMN "active" BOOLEAN;

-- AlterTable
ALTER TABLE "revision" ADD COLUMN "published" BOOLEAN;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "commentReply";
PRAGMA foreign_keys=on;
