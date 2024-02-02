import { Response,Request } from "express";
import { ListAtividadeService } from "../../services/atividades/ListAtividadeService";

export class ListAtividadeController{
    async handle(req:Request,res:Response){
        
        const listAtividadeService = new ListAtividadeService();

        const atividade = await listAtividadeService.execute();

        return res.json(atividade);
    }
}