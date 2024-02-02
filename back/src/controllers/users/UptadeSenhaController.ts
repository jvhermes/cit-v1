import { Request, Response } from "express";

import { UpdateSenhaService } from "../../services/users/UptadeSenhaService";

export class UpdateSenhaController{
    async handle(req:Request,res:Response){

        const {id,senha} = req.body;

        const updateSenhaService = new UpdateSenhaService();

        const usuario = await updateSenhaService.execute({id,senha});

        return res.json(usuario)
    }
}
