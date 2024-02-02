import { Request, Response } from "express";

import { DeleteDepartamentoService } from "../../services/departamentos/DeleteDepartamentoService";

export class DeleteDepartamentoController{
    async handle(req:Request,res:Response){
        const id = req.query.id as string

        const deleteDepartamentoService = new DeleteDepartamentoService();

        const departamento = await deleteDepartamentoService.execute({id})

        return res.json(departamento)
    }
}