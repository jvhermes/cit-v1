import { Request, Response } from "express";

import { UpdateAtividadeService } from "../../services/atividades/UpdateAtividadeService";

export class UpdateAtividadeController{
    async handle(req:Request,res:Response){

        const {nome,id} = req.body;

        const updateAtividadeService = new UpdateAtividadeService();

        const atividade = await updateAtividadeService.execute({id,nome});

        return res.json(atividade)
    }
}