/*
  Warnings:

  - You are about to drop the `Reenvio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reenvio" DROP CONSTRAINT "Reenvio_aprovacao_id_fkey";

-- DropForeignKey
ALTER TABLE "Reenvio" DROP CONSTRAINT "Reenvio_setorFonte_id_fkey";

-- DropTable
DROP TABLE "Reenvio";

-- CreateTable
CREATE TABLE "reenvio" (
    "id" TEXT NOT NULL,
    "setorFonte_id" TEXT NOT NULL,
    "aprovacao_id" TEXT NOT NULL,

    CONSTRAINT "reenvio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reenvio" ADD CONSTRAINT "reenvio_aprovacao_id_fkey" FOREIGN KEY ("aprovacao_id") REFERENCES "aprovacao-c"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reenvio" ADD CONSTRAINT "reenvio_setorFonte_id_fkey" FOREIGN KEY ("setorFonte_id") REFERENCES "setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
