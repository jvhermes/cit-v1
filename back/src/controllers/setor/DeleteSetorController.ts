import { Request, Response } from "express";

import { DeleteSetorService } from "../../services/setor/DeleteSetorService";

export class DeleteSetorController{
    async handle(req:Request,res:Response){
        const id = req.query.id as string

        const deleteSetorService = new DeleteSetorService();

        const setor = await deleteSetorService.execute({id})

        return res.json(setor)
    }
}