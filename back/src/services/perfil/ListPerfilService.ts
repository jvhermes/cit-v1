import prismaCLient from "../../prisma";

export class ListPerfilService{
    async execute(){
        
        const perfil = await prismaCLient.perfil.findMany()

        return perfil
        
    }
}