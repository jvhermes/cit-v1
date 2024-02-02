import { Response,Request } from "express";
import { DeleteLoteService } from "../../services/lotes/DeleteLoteService";

export class DeleteLoteController{
    async handle(req:Request,res:Response){
        const deleteLoteService = new DeleteLoteService();

        const lote = await deleteLoteService.execute();

        return res.json(lote)
    }
}