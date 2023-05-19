/*
  Warnings:

  - Made the column `active` on table `pages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `published` on table `revision` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "documentId" TEXT NOT NULL,
    "pageNumber" INTEGER NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    CONSTRAINT "pages_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "document" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pages" ("active", "content", "documentId", "id", "pageNumber", "title") SELECT "active", "content", "documentId", "id", "pageNumber", "title" FROM "pages";
DROP TABLE "pages";
ALTER TABLE "new_pages" RENAME TO "pages";
CREATE TABLE "new_revision" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageId" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL,
    CONSTRAINT "revision_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "revision_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_revision" ("content", "id", "pageId", "published", "title", "userId") SELECT "content", "id", "pageId", "published", "title", "userId" FROM "revision";
DROP TABLE "revision";
ALTER TABLE "new_revision" RENAME TO "revision";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
