import { Response,Request } from "express";
import { ListPerfilService } from "../../services/perfil/ListPerfilService";

export class ListPerfilController{
    async handle(req:Request,res:Response){
        
        const listPerfilService  = new ListPerfilService ();

        const perfil = await listPerfilService.execute();

        return res.json(perfil);
    }
}