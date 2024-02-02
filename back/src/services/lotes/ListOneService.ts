import prismaCLient from "../../prisma";

interface LoteRequest{
    id:number
}

export class ListOneService{
    async execute({id}:LoteRequest){
        
        const lote = await prismaCLient.lote.findFirst({
            where:{
                id:id
            }
        })


        return lote;

    }
}