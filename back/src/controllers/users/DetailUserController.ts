import { Request,Response } from "express";
import { DetailUserService } from "../../services/users/DetailUserService";

export class DetailUserController{
    async handle(req:Request,res:Response){

        const usuario_id = req.usuario_id

        const detailUserService = new DetailUserService();

        const user = await detailUserService.execute(usuario_id);

        return res.json(user)
    }
}