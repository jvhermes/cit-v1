import { Response,Request } from "express";
import { ListProcessoCarDepService } from "../../services/processo-cartorio/ListProcessoCarDepService";

export class ListProcessoCarDepController{
    async handle(req:Request,res:Response){
        
        const dep = req.query.dep as string

        const listProcessoCarDepService = new ListProcessoCarDepService();

        const processo = await listProcessoCarDepService.execute({dep});

        return res.json(processo);
    }
}