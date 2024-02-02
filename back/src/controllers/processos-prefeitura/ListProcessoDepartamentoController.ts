import { Response,Request } from "express";
import { ListProcessoDepartamentoService } from "../../services/processos-prefeitura/ListProcessoDepartamentoService";

export class ListProcessoDepartamentoController{
    async handle(req:Request,res:Response){
        
        const dep = req.query.dep as string

        const listProcessoService = new ListProcessoDepartamentoService();

        const processo = await listProcessoService.execute({dep});

        return res.json(processo);
    }
}