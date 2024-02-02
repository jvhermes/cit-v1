import prismaCLient from "../../prisma";

export class ListDepartamentoService{
    async execute(){
        
        const departamento = await prismaCLient.departamento.findMany()

        return departamento
        
    }
}