import { ListProcessoCartorioAdminService } from "../../services/processo-cartorio/ListProcessoCarAdminService";
import { Response,Request } from "express";

export class ListProcessoCartAdminController{
    async handle(req:Request,res:Response){
        
        const listProcessoGeralAdminService = new ListProcessoCartorioAdminService();

        const processo = await listProcessoGeralAdminService.execute();

        return res.json(processo);
    }
}