/*
  Warnings:

  - Added the required column `prazo` to the `aprovacao-descricao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prazo` to the `processo-c` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aprovacao-descricao" ADD COLUMN     "prazo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "processo-c" ADD COLUMN     "prazo" TEXT NOT NULL;
