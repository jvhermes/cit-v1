import { Request,Response } from "express";
import { CreatePerfilService } from "../../services/perfil/CreatePerfilService";

export class CreatePerfilController{
    async handle(req:Request,res:Response){
        
        const {nome,tipo,admin} = req.body;

        const createPerfilService = new CreatePerfilService();

        const usuario = await createPerfilService.execute({nome,tipo,admin});

        return res.json(usuario)
    }
}