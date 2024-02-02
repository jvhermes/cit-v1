import { Request, Response } from "express";

import { UpdateUserService } from "../../services/users/UpdateUserService";

export class UpdateUserController{
    async handle(req:Request,res:Response){

        const {nome,email,id,avatar,ativo,perfil_id,departamento_id,setor_id} = req.body;

        const updateUserService = new UpdateUserService();

        const usuario = await updateUserService.execute({nome,email,id,avatar,ativo,perfil_id,setor_id,departamento_id});

        return res.json(usuario)
    }
}
