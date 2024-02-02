import { Response,Request } from "express";
import { ListProcessoGeralAdminService } from "../../services/processos-prefeitura/LIstProcessoAdminGeralService";

export class ListProcessoAdminGeralController{
    async handle(req:Request,res:Response){
        
       

        const listProcessoGeralService = new ListProcessoGeralAdminService();

        const processo = await listProcessoGeralService.execute();

        return res.json(processo);
    }
}