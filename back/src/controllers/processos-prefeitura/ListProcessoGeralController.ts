import { Response,Request } from "express";
import { ListProcessoGeralService } from "../../services/processos-prefeitura/ListProcessoGeralService";

export class ListProcessoGeralController{
    async handle(req:Request,res:Response){
        
        const set = req.query.set as string
        const listProcessoGeralService = new ListProcessoGeralService();

        const processo = await listProcessoGeralService.execute({set});

        return res.json(processo);
    }
}