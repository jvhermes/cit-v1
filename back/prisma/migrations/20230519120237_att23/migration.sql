/*
  Warnings:

  - You are about to drop the column `alvara` on the `aprovacao-descricao` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "aprovacao-c" ADD COLUMN     "alvara" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "aprovacao-descricao" DROP COLUMN "alvara";
