-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Epic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "closed" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Epic" ("description", "id", "title") SELECT "description", "id", "title" FROM "Epic";
DROP TABLE "Epic";
ALTER TABLE "new_Epic" RENAME TO "Epic";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
