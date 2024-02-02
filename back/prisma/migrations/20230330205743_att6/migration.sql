/*
  Warnings:

  - You are about to drop the `usuario-cartorio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario-prefeitura` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "usuario-cartorio" DROP CONSTRAINT "usuario-cartorio_departamento_id_fkey";

-- DropForeignKey
ALTER TABLE "usuario-cartorio" DROP CONSTRAINT "usuario-cartorio_perfil_id_fkey";

-- DropForeignKey
ALTER TABLE "usuario-prefeitura" DROP CONSTRAINT "usuario-prefeitura_perfil_id_fkey";

-- DropForeignKey
ALTER TABLE "usuario-prefeitura" DROP CONSTRAINT "usuario-prefeitura_setor_id_fkey";

-- DropTable
DROP TABLE "usuario-cartorio";

-- DropTable
DROP TABLE "usuario-prefeitura";

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "nome_usuario" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "setor_id" TEXT NOT NULL,
    "departamento_id" TEXT NOT NULL,
    "perfil_id" TEXT NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_nome_usuario_key" ON "usuario"("nome_usuario");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_departamento_id_fkey" FOREIGN KEY ("departamento_id") REFERENCES "departamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_setor_id_fkey" FOREIGN KEY ("setor_id") REFERENCES "setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
