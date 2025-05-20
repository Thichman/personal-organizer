/*
  Warnings:

  - The `date_due` column on the `Todo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "date_due",
ADD COLUMN     "date_due" TIMESTAMP(3);
