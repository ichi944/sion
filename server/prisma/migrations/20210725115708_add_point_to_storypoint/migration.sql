/*
  Warnings:

  - Added the required column `point` to the `StoryPoint` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StoryPoint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "epicId" INTEGER NOT NULL,
    "point" INTEGER NOT NULL,
    FOREIGN KEY ("epicId") REFERENCES "Epic" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_StoryPoint" ("epicId", "id") SELECT "epicId", "id" FROM "StoryPoint";
DROP TABLE "StoryPoint";
ALTER TABLE "new_StoryPoint" RENAME TO "StoryPoint";
CREATE UNIQUE INDEX "StoryPoint_epicId_unique" ON "StoryPoint"("epicId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
