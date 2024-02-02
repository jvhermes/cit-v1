import prismaCLient from "../../prisma";

export class ListLoteService{
    async execute(){
        
        const lote = await prismaCLient.lote.findMany()

   
        return lote
    }
}