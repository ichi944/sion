-- CreateTable
CREATE TABLE "StoryPoint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "epicId" INTEGER NOT NULL,
    FOREIGN KEY ("epicId") REFERENCES "Epic" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "StoryPoint_epicId_unique" ON "StoryPoint"("epicId");
