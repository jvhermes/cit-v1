import prismaCLient from "../../prisma";

export class ListAtividadeService{
    async execute(){
        
        const atividade = await prismaCLient.atividade.findMany()

        return atividade
    }
}