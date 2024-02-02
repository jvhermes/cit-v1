import { Response,Request } from "express";
import { ListDepartamentoService } from "../../services/departamentos/ListDepartamentoService";

export class ListDepartamentoController{
    async handle(req:Request,res:Response){
        const listDepartamentoService = new ListDepartamentoService();

        const departamento = await listDepartamentoService.execute();

        return res.json(departamento)
    }
}