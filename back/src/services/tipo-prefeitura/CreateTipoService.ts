import prismaCLient from "../../prisma";

interface TipoRequest{
    nome:string
}

export class CreateTipoService{
    async execute({nome}:TipoRequest){
        
        const tipoExiste = await prismaCLient.tipo.findFirst({
            where:{
                nome: nome
            }
        })

        if(tipoExiste){
            throw new Error("tipo ja existe");
        }

        if(nome === ''){
            throw new Error("Nome invalido")
        }

        const tipo = await prismaCLient.tipo.create({
            data:{
                nome:nome
            }
        })

        return tipo
    }
}