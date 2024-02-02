/*
  Warnings:

  - Added the required column `enviado_de` to the `reenvio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reenvio" ADD COLUMN     "enviado_de" TEXT NOT NULL;
