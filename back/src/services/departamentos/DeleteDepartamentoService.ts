import prismaCLient from "../../prisma";

interface DepartamentoRequest{
    id: string;
}

export class DeleteDepartamentoService{
    async execute({id}:DepartamentoRequest){

        const departamento = await prismaCLient.departamento.delete({
            where:{
                id:id,
            }
        })

        return departamento;

    }
}