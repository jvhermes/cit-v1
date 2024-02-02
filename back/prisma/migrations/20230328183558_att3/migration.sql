/*
  Warnings:

  - Added the required column `departamento_fonte_id` to the `aprovacao-c` table without a default value. This is not possible if the table is not empty.
  - Added the required column `setor_id` to the `aprovacao-c` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departamento_fonte_id` to the `processo-c` table without a default value. This is not possible if the table is not empty.
  - Added the required column `setor_fonte_id` to the `processos-p` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aprovacao-c" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "departamento_fonte_id" TEXT NOT NULL,
ADD COLUMN     "setor_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "processo-c" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "departamento_fonte_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "processos-p" ADD COLUMN     "setor_fonte_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "processos-p" ADD CONSTRAINT "processos-p_setor_fonte_id_fkey" FOREIGN KEY ("setor_fonte_id") REFERENCES "setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aprovacao-c" ADD CONSTRAINT "aprovacao-c_departamento_fonte_id_fkey" FOREIGN KEY ("departamento_fonte_id") REFERENCES "departamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aprovacao-c" ADD CONSTRAINT "aprovacao-c_setor_id_fkey" FOREIGN KEY ("setor_id") REFERENCES "setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processo-c" ADD CONSTRAINT "processo-c_departamento_fonte_id_fkey" FOREIGN KEY ("departamento_fonte_id") REFERENCES "departamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
