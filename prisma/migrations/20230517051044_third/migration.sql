/*
  Warnings:

  - You are about to drop the column `image` on the `pages` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `revision` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "commentReply" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "commentReply_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "commentReply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageId" TEXT,
    "revisionId" TEXT,
    "type" TEXT,
    "size" TEXT,
    "image" TEXT NOT NULL,
    "dimension" BIGINT NOT NULL,
    CONSTRAINT "image_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "image_revisionId_fkey" FOREIGN KEY ("revisionId") REFERENCES "revision" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "documentId" TEXT NOT NULL,
    "pageNumber" INTEGER NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    CONSTRAINT "pages_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "document" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pages" ("content", "documentId", "id", "pageNumber", "title") SELECT "content", "documentId", "id", "pageNumber", "title" FROM "pages";
DROP TABLE "pages";
ALTER TABLE "new_pages" RENAME TO "pages";
CREATE TABLE "new_revision" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageId" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "revision_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "revision_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_revision" ("content", "id", "pageId", "title", "userId") SELECT "content", "id", "pageId", "title", "userId" FROM "revision";
DROP TABLE "revision";
ALTER TABLE "new_revision" RENAME TO "revision";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
