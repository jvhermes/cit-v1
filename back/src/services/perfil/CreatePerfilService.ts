import prismaCLient from "../../prisma";

interface PerfilRequest{
    nome:string;
    tipo: string;
    admin: boolean;
}

export class CreatePerfilService{
    async execute({nome,tipo,admin}: PerfilRequest){


        const perfilExiste = await prismaCLient.perfil.findFirst({
            where:{
                nome: nome
            }
        })

        if(perfilExiste){
            throw new Error("Perfil ja cadastrado")
        }

        const perfil = await prismaCLient.perfil.create({
            data:{
                nome: nome,
                tipo: tipo,
                admin: admin
            },
            
        })

        return perfil
    }
}