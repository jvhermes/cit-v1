import { Request,Response } from "express";
import { DetailUserExtService } from "../../services/users/DetailUserExtService";

export class DetailUserExtController{
    async handle(req:Request,res:Response){

        const id = req.query.id as string

        const detailUserExtService = new DetailUserExtService();

        const user = await detailUserExtService.execute(id);

        return res.json(user)
    }
}