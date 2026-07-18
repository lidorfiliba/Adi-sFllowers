/*
  Warnings:

  - You are about to drop the column `bouquetId` on the `Order` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL DEFAULT '',
    "items" TEXT NOT NULL DEFAULT '[]',
    "bouquetType" TEXT NOT NULL DEFAULT 'full_set',
    "deliveryType" TEXT NOT NULL,
    "deliveryAddress" TEXT NOT NULL DEFAULT '',
    "deliveryDate" TEXT NOT NULL,
    "deliveryTime" TEXT NOT NULL DEFAULT '',
    "greetingMessage" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'PENDING_PAYMENT',
    "totalAmount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Order" ("createdAt", "customerEmail", "customerName", "customerPhone", "deliveryAddress", "deliveryDate", "deliveryTime", "deliveryType", "greetingMessage", "id", "status", "totalAmount", "updatedAt") SELECT "createdAt", "customerEmail", "customerName", "customerPhone", "deliveryAddress", "deliveryDate", "deliveryTime", "deliveryType", "greetingMessage", "id", "status", "totalAmount", "updatedAt" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
