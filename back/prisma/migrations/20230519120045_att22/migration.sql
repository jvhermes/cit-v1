/*
  Warnings:

  - You are about to drop the column `alvara` on the `processos-p` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "aprovacao-descricao" ADD COLUMN     "alvara" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "processos-p" DROP COLUMN "alvara";
