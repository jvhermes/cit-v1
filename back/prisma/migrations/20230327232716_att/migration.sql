/*
  Warnings:

  - You are about to drop the column `trasnc` on the `aprovacao-descricao` table. All the data in the column will be lost.
  - Added the required column `transcricao` to the `aprovacao-descricao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aprovacao-descricao" DROP COLUMN "trasnc",
ADD COLUMN     "transcricao" TEXT NOT NULL;
