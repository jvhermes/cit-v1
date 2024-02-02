import { Request, Response } from "express";

import { DeleteUserService } from "../../services/users/DeleteUserService";

export class DeleteUserController{
    async handle(req:Request,res:Response){
        const id = req.query.id as string

        const deleteUserService = new DeleteUserService();

        const user = await deleteUserService.execute({id})

        return res.json(user)
    }
}