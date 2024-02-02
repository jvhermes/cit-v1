import { Request,Response } from "express";
import { CreateAprovacaoPessoaService } from "../../services/aprovacao/CreateAprovacaoPessoaService";

export class CreateAprovacaoPessoaController{
    async handle(req:Request,res:Response){
        const {observacao,processo_id,setor_id,alvara,atraso} = req.body

        const createAprovacaoPessoaService = new CreateAprovacaoPessoaService ();

        const aprovacao = await createAprovacaoPessoaService.execute({observacao,processo_id,setor_id,alvara,atraso})

        return res.json(aprovacao)
    }
}