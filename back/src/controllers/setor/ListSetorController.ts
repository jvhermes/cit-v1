import { Response,Request } from "express";
import { ListSetorService } from "../../services/setor/ListSetorService";

export class ListSetorController{
    async handle(req:Request,res:Response){
        const listSetorService = new ListSetorService();

        const setor = await listSetorService.execute();

        return res.json(setor)
    }
}