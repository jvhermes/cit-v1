import { Request,Response } from "express";
import { CreateUserService } from "../../services/users/CreateUserService";

export class CreateUserController{
    async handle(req:Request,res:Response){
        const {nome,email,senha,departamento_id,setor_id,perfil_id,avatar} = req.body;

        const createUserService = new CreateUserService();

        const usuario = await createUserService.execute({nome,email,senha,departamento_id,setor_id,perfil_id,avatar});

        return res.json(usuario)
    }
}