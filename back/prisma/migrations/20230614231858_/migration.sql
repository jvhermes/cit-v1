/*
  Warnings:

  - You are about to drop the `tipo-c` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "processo-c" DROP CONSTRAINT "processo-c_tipo_id_fkey";

-- DropTable
DROP TABLE "tipo-c";

-- AddForeignKey
ALTER TABLE "processo-c" ADD CONSTRAINT "processo-c_tipo_id_fkey" FOREIGN KEY ("tipo_id") REFERENCES "tipo-p"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
