
import { ListProcessoCartorioGeralAdminService } from "../../services/processo-cartorio/ListProcessoCarGeralAdminService";
import { Response,Request } from "express";

export class ListProcessoCartGeralAdminController{
    async handle(req:Request,res:Response){
        
        const listProcessoGeralAdminService = new ListProcessoCartorioGeralAdminService();

        const processo = await listProcessoGeralAdminService.execute();

        return res.json(processo);
    }
}