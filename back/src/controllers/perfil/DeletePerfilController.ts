import { Request, Response } from "express";

import { DeletePerfilService } from "../../services/perfil/DeletePerfilService";

export class DeletePerfilController{
    async handle(req:Request,res:Response){
        
        const id = req.query.id as string

        const deletePerfilService = new DeletePerfilService();

        const perfil = await deletePerfilService.execute({id})

        return res.json(perfil)
    }
}