import { Response,Request } from "express";
import { ListProcessoSetorService } from "../../services/processos-prefeitura/ListProcessoService";

export class ListProcessoSetorController{
    async handle(req:Request,res:Response){
        
        const set = req.query.set as string

        const listProcessoSetorService = new ListProcessoSetorService();

        const processo = await listProcessoSetorService.execute({set});

        return res.json(processo);
    }
}