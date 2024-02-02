/*
  Warnings:

  - You are about to drop the column `setorFonte_id` on the `reenvio` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "reenvio" DROP CONSTRAINT "reenvio_setorFonte_id_fkey";

-- AlterTable
ALTER TABLE "reenvio" DROP COLUMN "setorFonte_id";
