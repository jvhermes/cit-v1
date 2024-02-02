import { Request, Response } from "express";

import { DeleteAtividadeService } from "../../services/atividades/DeleteAtividadeService";

export class DeleteAtividadeController{
    async handle(req:Request,res:Response){
        const id = req.query.id as string

        const deleteAtividadeService = new DeleteAtividadeService();

        const atividade = await deleteAtividadeService.execute({id})

        return res.json(atividade)
    }
}