/*
  Warnings:

  - You are about to drop the `_QouteCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_QouteCategories";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_CategoryToQoute" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CategoryToQoute_A_fkey" FOREIGN KEY ("A") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoryToQoute_B_fkey" FOREIGN KEY ("B") REFERENCES "Qoute" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToQoute_AB_unique" ON "_CategoryToQoute"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToQoute_B_index" ON "_CategoryToQoute"("B");
