import { Request, Response } from "express";

import { UpdateSetorService } from "../../services/setor/UpdateSetorService";

export class UpdateSetorController{
    async handle(req:Request,res:Response){

        const {nome,id} = req.body;

        const updateSetorService = new UpdateSetorService();

        const setor = await updateSetorService.execute({id,nome});

        return res.json(setor)
    }
}