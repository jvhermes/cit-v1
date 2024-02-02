import { Request, Response } from "express";

import { CloseProcessoCartorioService } from "../../services/processo-cartorio/CloseProcessoCartorioService";

export class CloseProcessoCartorioController{
    async handle(req:Request,res:Response){

        const {id,excluido} = req.body 

        const closeProcessoCartorioService = new CloseProcessoCartorioService();

        const processo = await closeProcessoCartorioService.execute({id,excluido});

        return res.json(processo)
    }
}