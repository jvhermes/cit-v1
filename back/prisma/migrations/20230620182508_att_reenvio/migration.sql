-- DropForeignKey
ALTER TABLE "reenvio" DROP CONSTRAINT "reenvio_aprovacaoPessoa_id_fkey";

-- DropForeignKey
ALTER TABLE "reenvio" DROP CONSTRAINT "reenvio_aprovacao_id_fkey";

-- AlterTable
ALTER TABLE "reenvio" ALTER COLUMN "aprovacao_id" DROP NOT NULL,
ALTER COLUMN "aprovacaoPessoa_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "reenvio" ADD CONSTRAINT "reenvio_aprovacao_id_fkey" FOREIGN KEY ("aprovacao_id") REFERENCES "aprovacao-c"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reenvio" ADD CONSTRAINT "reenvio_aprovacaoPessoa_id_fkey" FOREIGN KEY ("aprovacaoPessoa_id") REFERENCES "aprovacao-pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
