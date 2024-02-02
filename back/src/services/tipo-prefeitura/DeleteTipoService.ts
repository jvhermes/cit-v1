import prismaCLient from "../../prisma";

interface TipoRequest{
    id: string;
}

export class DeleteTipoService{
    async execute({id}:TipoRequest){

        const tipo = await prismaCLient.tipo.delete({
            where:{
                id:id,
            }
        })

        return tipo;

    }
}