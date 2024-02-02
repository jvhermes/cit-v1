/*
  Warnings:

  - You are about to drop the column `prazo` on the `aprovacao-c` table. All the data in the column will be lost.
  - You are about to drop the column `prazo` on the `processo-c` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "aprovacao-c" DROP COLUMN "prazo";

-- AlterTable
ALTER TABLE "processo-c" DROP COLUMN "prazo";

-- AlterTable
ALTER TABLE "processos-p" ADD COLUMN     "ano" TEXT NOT NULL DEFAULT '2023';
