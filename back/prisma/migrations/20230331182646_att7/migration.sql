-- CreateTable
CREATE TABLE "Reenvio" (
    "id" TEXT NOT NULL,
    "setorFonte_id" TEXT NOT NULL,
    "aprovacao_id" TEXT NOT NULL,

    CONSTRAINT "Reenvio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reenvio" ADD CONSTRAINT "Reenvio_aprovacao_id_fkey" FOREIGN KEY ("aprovacao_id") REFERENCES "aprovacao-c"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reenvio" ADD CONSTRAINT "Reenvio_setorFonte_id_fkey" FOREIGN KEY ("setorFonte_id") REFERENCES "setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
