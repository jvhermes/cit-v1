import prismaCLient from "../../prisma";

interface AtividadeRequest{
    nome:string
}

export class CreateAtividadeService{
    async execute({nome}:AtividadeRequest){
        
        const atividadeExiste = await prismaCLient.atividade.findFirst({
            where:{
                nome: nome
            }
        })

        if(atividadeExiste){
            throw new Error("atividade ja existe");
        }

        if(nome === ''){
            throw new Error("Nome invalido")
        }

        const atividade = await prismaCLient.atividade.create({
            data:{
                nome:nome
            }
        })

        return atividade
    }
}