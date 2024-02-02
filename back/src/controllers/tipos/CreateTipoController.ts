import { Request, Response } from "express";
import { CreateTipoService } from "../../services/tipo-prefeitura/CreateTipoService";

export class CreateTipoController{
    async handle(req:Request, res: Response){
        const {nome} = req.body

        const createTipoService = new CreateTipoService();

        const tipo = await createTipoService.execute({nome});

        return res.json(tipo)
    }
}