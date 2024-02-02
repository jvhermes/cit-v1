import { Response,Request } from "express";
import { ListProcessoCartorioGeralService } from "../../services/processo-cartorio/ListProcessoCartorioGeralService";

export class ListProcessoCartorioGeralController{
    async handle(req:Request,res:Response){
        
        const dep = req.query.dep as string

        const listProcessoCartorioGeralService = new ListProcessoCartorioGeralService();

        const processo = await listProcessoCartorioGeralService.execute({dep});

        return res.json(processo);
    }
}