import prismaCLient from "../../prisma";

interface SetorRequest{
    id:string
    nome:string
}

export class UpdateSetorService{
    async execute({id,nome}:SetorRequest){
        
        if(nome === ''){
            throw new Error("Nome invalido")
        }
        
        const setorExiste = await prismaCLient.setor.findFirst({
            where:{
                nome:nome
            }
        })

        if(setorExiste){
            throw new Error("Departamento ja existe")
        }


        const setor = await prismaCLient.setor.update({
            where:{id:id},
            data:{
                nome:nome,
            }
        })

        return setor;

    }
}