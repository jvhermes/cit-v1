import { Request, Response } from "express";
import { CreateDepartamentoService } from "../../services/departamentos/CreateDepartamentoService";

export class CreateDepartamentoController{
    async handle(req:Request, res: Response){
        const {nome} = req.body

        const createDepartamentoService = new CreateDepartamentoService();

        const departamento = await createDepartamentoService.execute({nome});

        return res.json(departamento)
    }
}