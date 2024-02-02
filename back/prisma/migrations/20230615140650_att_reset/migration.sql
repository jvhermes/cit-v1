/*
  Warnings:

  - Added the required column `processoPrefeitura_id` to the `descricao-c` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processoCartorio_id` to the `descricao-p` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "descricao-c" ADD COLUMN     "processoPrefeitura_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "descricao-p" ADD COLUMN     "processoCartorio_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "descricao-p" ADD CONSTRAINT "descricao-p_processoCartorio_id_fkey" FOREIGN KEY ("processoCartorio_id") REFERENCES "processo-c"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descricao-c" ADD CONSTRAINT "descricao-c_processoPrefeitura_id_fkey" FOREIGN KEY ("processoPrefeitura_id") REFERENCES "processos-p"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
