import { Request, Response } from "express";

import { CloseProcessoService } from "../../services/processos-prefeitura/CloseProcessoService";

export class CloseProcessoController{
    async handle(req:Request,res:Response){

        const {id,conclusao} = req.body 

        const closeProcessoService = new CloseProcessoService();

        const processo = await closeProcessoService.execute({id,conclusao});

        return res.json(processo)
    }
}