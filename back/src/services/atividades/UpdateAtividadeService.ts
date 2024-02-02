import prismaCLient from "../../prisma";

interface AtividadeRequest{
    id:string
    nome:string
}

export class UpdateAtividadeService{
    async execute({id,nome}:AtividadeRequest){
        
        if(nome === ''){
            throw new Error("Nome invalido")
        }

        const atividadeExiste = await prismaCLient.atividade.findFirst({
            where:{
                nome:nome
            }
        })

        if(atividadeExiste){
            throw new Error("Atividade ja existe")
        }

        const atividade = await prismaCLient.atividade.update({
            where:{id:id},
            data:{
                nome:nome,
            }
        })

        return atividade;

    }
}