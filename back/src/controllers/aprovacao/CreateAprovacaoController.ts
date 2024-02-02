import { Request,Response } from "express";
import { CreateAprovacaoService } from "../../services/aprovacao/CreateAprovacaoService";

export class CreateAprovacaoController{
    async handle(req:Request,res:Response){
        const {observacao,processo_id,descricao,setor_id,alvara,atraso} = req.body

        const createAprovacaoService = new CreateAprovacaoService();

        const aprovacao = await createAprovacaoService.execute({observacao,processo_id,setor_id,descricao,alvara,atraso})

        return res.json(aprovacao)
    }
}