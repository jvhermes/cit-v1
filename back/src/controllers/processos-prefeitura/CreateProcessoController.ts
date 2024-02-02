import { Request,Response } from "express";
import { CreateProcessoService } from "../../services/processos-prefeitura/CreateProcessoService";

export class CreateProcessoController{
    async handle(req:Request,res:Response){
        const {num_processo,prazo,atividade_id,departamento_id,lote_id,tipo_id,descricaoLotes,descricaoPessoa,setor_id,ano,criado_em,tipoLote,texto,doc_id} = req.body

        const createProcessoService = new CreateProcessoService();

        const processo = await createProcessoService.execute({num_processo,prazo,atividade_id,departamento_id,lote_id,tipo_id,descricaoLotes,descricaoPessoa,doc_id,setor_id,ano,criado_em,tipoLote,texto});

        return res.json(processo)
    }
}