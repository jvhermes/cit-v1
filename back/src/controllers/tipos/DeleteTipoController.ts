import { Request, Response } from "express";

import { DeleteTipoService } from "../../services/tipo-prefeitura/DeleteTipoService";

export class DeleteTipoController{
    async handle(req:Request,res:Response){
        const id = req.query.id as string

        const deleteTipoService = new DeleteTipoService();

        const tipo = await deleteTipoService.execute({id})

        return res.json(tipo)
    }
}