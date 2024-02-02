import { Response,Request } from "express";
import { ListLoteService } from "../../services/lotes/ListLoteService";

export class ListLoteController{
    async handle(req:Request,res:Response){
        const listLoteService = new ListLoteService();

        const lote = await listLoteService.execute();

        return res.json(lote)
    }
}