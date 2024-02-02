import { Response,Request } from "express";
import { ListProcessoAdminService } from "../../services/processos-prefeitura/ListProcessAdminService";

export class ListProcessoAdminController{
    async handle(req:Request,res:Response){
        
        const listProcessoAdminService  = new ListProcessoAdminService ();

        const processo = await listProcessoAdminService.execute();

        return res.json(processo);
    }
}