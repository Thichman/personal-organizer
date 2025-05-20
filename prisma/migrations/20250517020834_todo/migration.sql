-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "table" TEXT NOT NULL,
    "item" TEXT NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
