import prismaCLient from "../../prisma";

interface DepartamentoRequest{
    id:string
    nome:string
}

export class UpdateDepartamentoService{
    async execute({id,nome}:DepartamentoRequest){
        
        if(nome === ''){
            throw new Error("Nome invalido")
        }
        
        const departamentoExiste = await prismaCLient.departamento.findFirst({
            where:{
                nome:nome
            }
        })

        if(departamentoExiste){
            throw new Error("Departamento ja existe")
        }


        const departamento = await prismaCLient.departamento.update({
            where:{id:id},
            data:{
                nome:nome,
            }
        })

        return departamento;

    }
}