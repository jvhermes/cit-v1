/*
  Warnings:

  - You are about to drop the column `deparamento_id` on the `processos-p` table. All the data in the column will be lost.
  - Added the required column `departamento_id` to the `processos-p` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "processos-p" DROP CONSTRAINT "processos-p_deparamento_id_fkey";

-- AlterTable
ALTER TABLE "processos-p" DROP COLUMN "deparamento_id",
ADD COLUMN     "departamento_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "processos-p" ADD CONSTRAINT "processos-p_departamento_id_fkey" FOREIGN KEY ("departamento_id") REFERENCES "departamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
