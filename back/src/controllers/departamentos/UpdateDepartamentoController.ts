import { Request, Response } from "express";

import { UpdateDepartamentoService } from "../../services/departamentos/UpdateDepartamentoService";

export class UpdateDepartamentoController{
    async handle(req:Request,res:Response){

        const {nome,id} = req.body;

        const updateDepartamentoService = new UpdateDepartamentoService();

        const departamento = await updateDepartamentoService.execute({id,nome});

        return res.json(departamento)
    }
}