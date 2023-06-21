/*
  Warnings:

  - You are about to drop the column `category` on the `Phrase` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Phrase` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Phrase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoryId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Phrase_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Phrase" ("createdAt", "id", "status", "text", "updatedAt") SELECT "createdAt", "id", "status", "text", "updatedAt" FROM "Phrase";
DROP TABLE "Phrase";
ALTER TABLE "new_Phrase" RENAME TO "Phrase";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
