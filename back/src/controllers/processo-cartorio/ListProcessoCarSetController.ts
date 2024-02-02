import { Response,Request } from "express";
import { ListProcessoCarSetService } from "../../services/processo-cartorio/ListProcessoCarSetService";

export class ListProcessoCarSetController{
    async handle(req:Request,res:Response){
        
        const set = req.query.set as string

        const listProcessoCarSetService = new ListProcessoCarSetService();

        const processo = await listProcessoCarSetService.execute({set});

        return res.json(processo);
    }
}