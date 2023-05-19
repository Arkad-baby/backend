/*
  Warnings:

  - You are about to drop the column `pagesId` on the `comment` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "documentId" TEXT,
    "pageId" TEXT,
    "revisionId" TEXT,
    CONSTRAINT "comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comment_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "document" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "comment_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "comment_revisionId_fkey" FOREIGN KEY ("revisionId") REFERENCES "revision" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_comment" ("documentId", "id", "revisionId", "text", "userId") SELECT "documentId", "id", "revisionId", "text", "userId" FROM "comment";
DROP TABLE "comment";
ALTER TABLE "new_comment" RENAME TO "comment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
