/*
  Warnings:

  - The `processo_id` column on the `descricao-c` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `processoCartorio_id` column on the `descricao-p` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `processo-c` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `lote_id` on the `processo-c` table. All the data in the column will be lost.
  - The `id` column on the `processo-c` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "descricao-c" DROP CONSTRAINT "descricao-c_processo_id_fkey";

-- DropForeignKey
ALTER TABLE "descricao-p" DROP CONSTRAINT "descricao-p_processoCartorio_id_fkey";

-- DropForeignKey
ALTER TABLE "processo-c" DROP CONSTRAINT "processo-c_lote_id_fkey";

-- AlterTable
ALTER TABLE "descricao-c" DROP COLUMN "processo_id",
ADD COLUMN     "processo_id" INTEGER;

-- AlterTable
ALTER TABLE "descricao-p" DROP COLUMN "processoCartorio_id",
ADD COLUMN     "processoCartorio_id" INTEGER;

-- AlterTable
ALTER TABLE "processo-c" DROP CONSTRAINT "processo-c_pkey",
DROP COLUMN "lote_id",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "processo-c_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "ProcessoCartorioToLotee" (
    "processo_id" INTEGER NOT NULL,
    "lote_id" INTEGER NOT NULL,

    CONSTRAINT "ProcessoCartorioToLotee_pkey" PRIMARY KEY ("processo_id","lote_id")
);

-- AddForeignKey
ALTER TABLE "ProcessoCartorioToLotee" ADD CONSTRAINT "ProcessoCartorioToLotee_processo_id_fkey" FOREIGN KEY ("processo_id") REFERENCES "processo-c"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcessoCartorioToLotee" ADD CONSTRAINT "ProcessoCartorioToLotee_lote_id_fkey" FOREIGN KEY ("lote_id") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descricao-p" ADD CONSTRAINT "descricao-p_processoCartorio_id_fkey" FOREIGN KEY ("processoCartorio_id") REFERENCES "processo-c"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descricao-c" ADD CONSTRAINT "descricao-c_processo_id_fkey" FOREIGN KEY ("processo_id") REFERENCES "processo-c"("id") ON DELETE SET NULL ON UPDATE CASCADE;
