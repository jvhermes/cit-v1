/*
  Warnings:

  - A unique constraint covering the columns `[processo_id]` on the table `aprovacao-c` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "aprovacao-c_processo_id_key" ON "aprovacao-c"("processo_id");
