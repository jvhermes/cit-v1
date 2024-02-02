-- AlterTable
ALTER TABLE "processo-c" ADD COLUMN     "tipoLote" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "processos-p" ADD COLUMN     "tipoLote" BOOLEAN NOT NULL DEFAULT true;
