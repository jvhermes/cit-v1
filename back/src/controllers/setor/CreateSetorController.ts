import { Request, Response } from "express";
import { CreateSetorService } from "../../services/setor/CreateSetorService";

export class CreateSetorController{
    async handle(req:Request, res: Response){
        const {nome} = req.body

        const createSetorService = new CreateSetorService();

        const setor = await createSetorService.execute({nome});

        return res.json(setor)
    }
}