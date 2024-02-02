/*
  Warnings:

  - Added the required column `observacao` to the `reenvio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reenvio" ADD COLUMN     "observacao" TEXT NOT NULL;
