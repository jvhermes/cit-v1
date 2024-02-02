import prismaCLient from "../../prisma";

interface PerfilRequest{
    id: string;
}

export class DeletePerfilService{
    async execute({id}:PerfilRequest){

        const perfil = await prismaCLient.perfil.delete({
            where:{
                id:id,
            }
        })

        return perfil;

    }
}