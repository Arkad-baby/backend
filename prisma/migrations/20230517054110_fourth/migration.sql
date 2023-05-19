-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageId" TEXT,
    "revisionId" TEXT,
    "type" TEXT,
    "size" TEXT,
    "image" TEXT NOT NULL,
    "dimension" TEXT NOT NULL,
    CONSTRAINT "image_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "image_revisionId_fkey" FOREIGN KEY ("revisionId") REFERENCES "revision" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_image" ("dimension", "id", "image", "pageId", "revisionId", "size", "type") SELECT "dimension", "id", "image", "pageId", "revisionId", "size", "type" FROM "image";
DROP TABLE "image";
ALTER TABLE "new_image" RENAME TO "image";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
