/*
  Warnings:

  - You are about to drop the column `prazo` on the `aprovacao-descricao` table. All the data in the column will be lost.
  - Added the required column `prazo` to the `aprovacao-c` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aprovacao-c" ADD COLUMN     "prazo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "aprovacao-descricao" DROP COLUMN "prazo";
