import { Request, Response } from "express";

import { UpdateTipoService } from "../../services/tipo-prefeitura/UpdateTipoService";

export class UpdateTipoController{
    async handle(req:Request,res:Response){

        const {nome,id} = req.body;

        const updateTipoService = new UpdateTipoService();

        const tipo = await updateTipoService.execute({id,nome});

        return res.json(tipo)
    }
}