import prismaCLient from "../../prisma";

interface DepartamentoRequest{
    nome:string
}

export class CreateDepartamentoService{
    async execute({nome}:DepartamentoRequest){

        const departamentoExiste = await prismaCLient.departamento.findFirst({
            where:{
                nome: nome
            }
        })

        if(departamentoExiste){
            throw new Error("departamento ja existe");
        }

        if(nome === ''){
            throw new Error("Nome invalido")
        }

        const departamento = await prismaCLient.departamento.create({
            data:{
                nome:nome
            }   
        })

        return departamento
    }
}