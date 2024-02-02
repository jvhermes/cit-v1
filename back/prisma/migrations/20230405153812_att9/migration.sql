/*
  Warnings:

  - You are about to drop the column `atividade_id` on the `processo-c` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "processo-c" DROP CONSTRAINT "processo-c_atividade_id_fkey";

-- AlterTable
ALTER TABLE "processo-c" DROP COLUMN "atividade_id";
