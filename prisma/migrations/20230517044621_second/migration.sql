-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "documentId" TEXT,
    "pagesId" TEXT,
    "revisionId" TEXT,
    CONSTRAINT "comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comment_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "document" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "comment_pagesId_fkey" FOREIGN KEY ("pagesId") REFERENCES "pages" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "comment_revisionId_fkey" FOREIGN KEY ("revisionId") REFERENCES "revision" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_comment" ("documentId", "id", "pagesId", "revisionId", "text", "userId") SELECT "documentId", "id", "pagesId", "revisionId", "text", "userId" FROM "comment";
DROP TABLE "comment";
ALTER TABLE "new_comment" RENAME TO "comment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
