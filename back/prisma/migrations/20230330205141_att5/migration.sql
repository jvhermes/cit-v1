/*
  Warnings:

  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_perfil_id_fkey";

-- DropTable
DROP TABLE "usuario";

-- CreateTable
CREATE TABLE "usuario-cartorio" (
    "id" TEXT NOT NULL,
    "nome_usuario" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "departamento_id" TEXT NOT NULL,
    "perfil_id" TEXT NOT NULL,

    CONSTRAINT "usuario-cartorio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario-prefeitura" (
    "id" TEXT NOT NULL,
    "nome_usuario" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "setor_id" TEXT NOT NULL,
    "perfil_id" TEXT NOT NULL,

    CONSTRAINT "usuario-prefeitura_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario-cartorio_nome_usuario_key" ON "usuario-cartorio"("nome_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "usuario-prefeitura_nome_usuario_key" ON "usuario-prefeitura"("nome_usuario");

-- AddForeignKey
ALTER TABLE "usuario-cartorio" ADD CONSTRAINT "usuario-cartorio_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario-cartorio" ADD CONSTRAINT "usuario-cartorio_departamento_id_fkey" FOREIGN KEY ("departamento_id") REFERENCES "departamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario-prefeitura" ADD CONSTRAINT "usuario-prefeitura_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario-prefeitura" ADD CONSTRAINT "usuario-prefeitura_setor_id_fkey" FOREIGN KEY ("setor_id") REFERENCES "setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
