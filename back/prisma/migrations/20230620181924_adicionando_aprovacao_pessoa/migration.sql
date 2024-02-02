/*
  Warnings:

  - You are about to drop the column `departamento_fonte_id` on the `aprovacao-c` table. All the data in the column will be lost.
  - You are about to drop the column `setor_id` on the `aprovacao-c` table. All the data in the column will be lost.
  - Added the required column `aprovacaoPessoa_id` to the `reenvio` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "aprovacao-c" DROP CONSTRAINT "aprovacao-c_departamento_fonte_id_fkey";

-- DropForeignKey
ALTER TABLE "aprovacao-c" DROP CONSTRAINT "aprovacao-c_setor_id_fkey";

-- AlterTable
ALTER TABLE "aprovacao-c" DROP COLUMN "departamento_fonte_id",
DROP COLUMN "setor_id";

-- AlterTable
ALTER TABLE "reenvio" ADD COLUMN     "aprovacaoPessoa_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "aprovacao-pessoa" (
    "id" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "alvara" TEXT NOT NULL DEFAULT '',
    "processo_id" INTEGER NOT NULL,

    CONSTRAINT "aprovacao-pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aprovacao-pessoa_processo_id_key" ON "aprovacao-pessoa"("processo_id");

-- AddForeignKey
ALTER TABLE "aprovacao-pessoa" ADD CONSTRAINT "aprovacao-pessoa_processo_id_fkey" FOREIGN KEY ("processo_id") REFERENCES "processos-p"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reenvio" ADD CONSTRAINT "reenvio_aprovacaoPessoa_id_fkey" FOREIGN KEY ("aprovacaoPessoa_id") REFERENCES "aprovacao-pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
