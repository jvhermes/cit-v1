-- DropForeignKey
ALTER TABLE "descricao-c" DROP CONSTRAINT "descricao-c_processoPrefeitura_id_fkey";

-- DropForeignKey
ALTER TABLE "descricao-c" DROP CONSTRAINT "descricao-c_processo_id_fkey";

-- DropForeignKey
ALTER TABLE "descricao-p" DROP CONSTRAINT "descricao-p_processoCartorio_id_fkey";

-- DropForeignKey
ALTER TABLE "descricao-p" DROP CONSTRAINT "descricao-p_processo_id_fkey";

-- AlterTable
ALTER TABLE "descricao-c" ALTER COLUMN "processo_id" DROP NOT NULL,
ALTER COLUMN "processoPrefeitura_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "descricao-p" ALTER COLUMN "processo_id" DROP NOT NULL,
ALTER COLUMN "processoCartorio_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "descricao-p" ADD CONSTRAINT "descricao-p_processo_id_fkey" FOREIGN KEY ("processo_id") REFERENCES "processos-p"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descricao-p" ADD CONSTRAINT "descricao-p_processoCartorio_id_fkey" FOREIGN KEY ("processoCartorio_id") REFERENCES "processo-c"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descricao-c" ADD CONSTRAINT "descricao-c_processo_id_fkey" FOREIGN KEY ("processo_id") REFERENCES "processo-c"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descricao-c" ADD CONSTRAINT "descricao-c_processoPrefeitura_id_fkey" FOREIGN KEY ("processoPrefeitura_id") REFERENCES "processos-p"("id") ON DELETE SET NULL ON UPDATE CASCADE;
