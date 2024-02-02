import { Request,Response } from "express";
import { DetailProcessService } from "../../services/processos-prefeitura/DetailProcessSerice";

export class DetailProcessController{
    async handle(req:Request,res:Response){

        const id = req.query.id as string

        const troca = parseInt(id)

        const detailProcessService = new DetailProcessService();

        const processo = await detailProcessService.execute(troca);

        return res.json(processo)
    }
}