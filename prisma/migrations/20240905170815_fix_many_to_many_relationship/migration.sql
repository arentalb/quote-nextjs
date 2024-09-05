/*
  Warnings:

  - You are about to drop the `Qoute_Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Qoute_Category";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_QouteCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_QouteCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_QouteCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Qoute" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_QouteCategories_AB_unique" ON "_QouteCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_QouteCategories_B_index" ON "_QouteCategories"("B");
