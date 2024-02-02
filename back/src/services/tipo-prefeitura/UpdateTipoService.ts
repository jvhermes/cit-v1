import prismaCLient from "../../prisma";

interface TipoRequest{
    id:string
    nome:string
}

export class UpdateTipoService{
    async execute({id,nome}:TipoRequest){
        
        if(nome === ''){
            throw new Error("Nome invalido")
        }

        const tipoExiste = await prismaCLient.tipo.findFirst({
            where:{
                nome:nome
            }
        })

        if(tipoExiste){
            throw new Error("Tipo ja existe")
        }

        const tipo = await prismaCLient.tipo.update({
            where:{id:id},
            data:{
                nome:nome,
            }
        })

        return tipo;

    }
}