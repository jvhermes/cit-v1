import prismaCLient from "../../prisma";

export class ListTipoService{
    async execute(){

        const tipo = await prismaCLient.tipo.findMany()

        return tipo;
    }
}