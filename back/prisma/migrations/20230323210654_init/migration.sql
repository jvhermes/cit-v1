-- CreateTable
CREATE TABLE "lotes" (
    "id" SERIAL NOT NULL,
    "codigo_imovel" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "quadra" TEXT NOT NULL,
    "lote" TEXT NOT NULL,
    "insc_imob" TEXT NOT NULL,
    "proprietario" TEXT NOT NULL,
    "area_total" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "testada" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atividades" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "atividades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departamentos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "departamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessoPrefeituraToLotee" (
    "processo_id" INTEGER NOT NULL,
    "lote_id" INTEGER NOT NULL,

    CONSTRAINT "ProcessoPrefeituraToLotee_pkey" PRIMARY KEY ("processo_id","lote_id")
);

-- CreateTable
CREATE TABLE "processos-p" (
    "id" SERIAL NOT NULL,
    "num_processo" TEXT NOT NULL,
    "prazo" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TEXT NOT NULL,
    "texto" TEXT NOT NULL DEFAULT '',
    "atividade_id" TEXT NOT NULL,
    "deparamento_id" TEXT NOT NULL,
    "tipo_id" TEXT NOT NULL,

    CONSTRAINT "processos-p_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "descricao-p" (
    "id" TEXT NOT NULL,
    "lote" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "testada" TEXT NOT NULL,
    "processo_id" INTEGER NOT NULL,

    CONSTRAINT "descricao-p_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aprovacao-c" (
    "id" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "processo_id" INTEGER NOT NULL,

    CONSTRAINT "aprovacao-c_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aprovacao-descricao" (
    "id" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "data_registro" TEXT NOT NULL,
    "trasnc" TEXT NOT NULL,
    "aprovacao_id" TEXT NOT NULL,
    "descricao_id" TEXT NOT NULL,

    CONSTRAINT "aprovacao-descricao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "processo-c" (
    "id" TEXT NOT NULL,
    "memorando" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "criado_em" TEXT NOT NULL,
    "atividade_id" TEXT NOT NULL,
    "lote_id" INTEGER NOT NULL,
    "setor_id" TEXT NOT NULL,
    "tipo_id" TEXT NOT NULL,

    CONSTRAINT "processo-c_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "descricao-c" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "processo_id" TEXT NOT NULL,

    CONSTRAINT "descricao-c_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "nome_usuario" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "perfil_id" TEXT NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfil" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL,

    CONSTRAINT "perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo-p" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "tipo-p_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo-c" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "tipo-c_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lotes_codigo_imovel_key" ON "lotes"("codigo_imovel");

-- CreateIndex
CREATE UNIQUE INDEX "processos-p_num_processo_key" ON "processos-p"("num_processo");

-- CreateIndex
CREATE UNIQUE INDEX "aprovacao-descricao_descricao_id_key" ON "aprovacao-descricao"("descricao_id");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_nome_usuario_key" ON "usuario"("nome_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "perfil_tipo_key" ON "perfil"("tipo");

-- AddForeignKey
ALTER TABLE "ProcessoPrefeituraToLotee" ADD CONSTRAINT "ProcessoPrefeituraToLotee_processo_id_fkey" FOREIGN KEY ("processo_id") REFERENCES "processos-p"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcessoPrefeituraToLotee" ADD CONSTRAINT "ProcessoPrefeituraToLotee_lote_id_fkey" FOREIGN KEY ("lote_id") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processos-p" ADD CONSTRAINT "processos-p_deparamento_id_fkey" FOREIGN KEY ("deparamento_id") REFERENCES "departamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processos-p" ADD CONSTRAINT "processos-p_atividade_id_fkey" FOREIGN KEY ("atividade_id") REFERENCES "atividades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processos-p" ADD CONSTRAINT "processos-p_tipo_id_fkey" FOREIGN KEY ("tipo_id") REFERENCES "tipo-p"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descricao-p" ADD CONSTRAINT "descricao-p_processo_id_fkey" FOREIGN KEY ("processo_id") REFERENCES "processos-p"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aprovacao-c" ADD CONSTRAINT "aprovacao-c_processo_id_fkey" FOREIGN KEY ("processo_id") REFERENCES "processos-p"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aprovacao-descricao" ADD CONSTRAINT "aprovacao-descricao_aprovacao_id_fkey" FOREIGN KEY ("aprovacao_id") REFERENCES "aprovacao-c"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aprovacao-descricao" ADD CONSTRAINT "aprovacao-descricao_descricao_id_fkey" FOREIGN KEY ("descricao_id") REFERENCES "descricao-p"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processo-c" ADD CONSTRAINT "processo-c_atividade_id_fkey" FOREIGN KEY ("atividade_id") REFERENCES "atividades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processo-c" ADD CONSTRAINT "processo-c_lote_id_fkey" FOREIGN KEY ("lote_id") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processo-c" ADD CONSTRAINT "processo-c_setor_id_fkey" FOREIGN KEY ("setor_id") REFERENCES "setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processo-c" ADD CONSTRAINT "processo-c_tipo_id_fkey" FOREIGN KEY ("tipo_id") REFERENCES "tipo-c"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descricao-c" ADD CONSTRAINT "descricao-c_processo_id_fkey" FOREIGN KEY ("processo_id") REFERENCES "processo-c"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
