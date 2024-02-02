import { Request,Response } from "express";
import { CreateReenvioService } from "../../services/reenvio/CreateReenvioService";

export class CreateReenvioController{
    async handle(req:Request,res:Response){
        const {observacao,setor_id,aprovacao_id,nome,enviado_de,processo_id,tipoLote} = req.body

        const createReenvioService = new CreateReenvioService();

        const reenvio = await createReenvioService.execute({observacao,setor_id,aprovacao_id,nome,enviado_de,processo_id,tipoLote});

        return res.json(reenvio)
    }
}