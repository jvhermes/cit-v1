import prismaCLient from "../../prisma";

export class ListSetorService{
    async execute(){
        
        const setor = await prismaCLient.setor.findMany()

        return setor
        
    }
}