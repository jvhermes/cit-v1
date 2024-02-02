import { Response,Request } from "express";
import { ListUserService } from "../../services/users/ListUserService";

export class ListUsuarioController{
    async handle(req:Request,res:Response){
        
        const listUserService = new ListUserService();

        const usuario = await listUserService.execute()

        return res.json(usuario);
    }
}