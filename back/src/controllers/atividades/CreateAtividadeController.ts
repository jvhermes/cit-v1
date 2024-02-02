import { Request, Response } from "express";
import { CreateAtividadeService } from "../../services/atividades/CreateAtividadeService";

export class CreateAtividadeController{
    async handle(req:Request, res: Response){
        const {nome} = req.body

        const createAtividadeService = new CreateAtividadeService();

        const atividade = await createAtividadeService.execute({nome});

        return res.json(atividade)
    }
}