import { Request, Response } from "express";

import { ListOneService } from "../../services/lotes/ListOneService";

export class ListOneController{
    async handle(req:Request,res:Response){

        const idResponse = req.query.id as string

        const id = parseInt(idResponse)
        
        const listOneService = new ListOneService();

        const lote = await listOneService.execute({id});

        return res.json(lote)
    }
}