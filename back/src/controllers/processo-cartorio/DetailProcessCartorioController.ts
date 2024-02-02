import { Request,Response } from "express";
import { DetailProcessCartorioService } from "../../services/processo-cartorio/DetailProcessoCartorioService";

export class DetailProcessCartorioController{
    async handle(req:Request,res:Response){

        const id = req.query.id as string

        const troca = parseInt(id)

        const detailProcessCartorioService = new DetailProcessCartorioService();

        const processo = await detailProcessCartorioService.execute(troca);

        return res.json(processo)
    }
}