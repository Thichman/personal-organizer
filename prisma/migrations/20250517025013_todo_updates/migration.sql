/*
  Warnings:

  - Added the required column `done` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hidden` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "done" BOOLEAN NOT NULL,
ADD COLUMN     "hidden" BOOLEAN NOT NULL;
