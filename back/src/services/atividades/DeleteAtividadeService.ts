import prismaCLient from "../../prisma";

interface AtividadeRequest{
    id: string;
}

export class DeleteAtividadeService{
    async execute({id}:AtividadeRequest){

        const atividade = await prismaCLient.atividade.delete({
            where:{
                id:id,
            }
        })

        return atividade;

    }
}