import { Response,Request } from "express";
import { ListTipoService } from "../../services/tipo-prefeitura/ListTipoService";

export class ListTipoController{
    async handle(req:Request,res:Response){
        
        const listTipoService = new ListTipoService();

        const tipo = await listTipoService.execute()

        return res.json(tipo);
    }
}