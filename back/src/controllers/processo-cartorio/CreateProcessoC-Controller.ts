import { Request,Response } from "express";
import { CreateProcessoCartorioService } from "../../services/processo-cartorio/CreateProcessoC-Service";

export class CreateProcessoCartorioController{
    async handle(req:Request,res:Response){
        const {setor_id,lote_id,tipo_id,descricaoLote,descricaoPessoa,observacao,departamento_id,tipoLote,doc_id} = req.body

        const createProcessoCartorioService = new CreateProcessoCartorioService();

        const processo = await createProcessoCartorioService.execute({setor_id,lote_id,tipo_id,descricaoLote,doc_id,descricaoPessoa,observacao,departamento_id,tipoLote});

        return res.json(processo)
    }
}