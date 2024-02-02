import prismaCLient from "../../prisma";


export class ListUserService{
    async execute(){

        const usuario = await prismaCLient.usuario.findMany({
            select:{
                id:true,
                nome:true,
                email:true,
                departamento_id:true,
                ativo:true,
                setor_id:true,
                avatar:true,
                perfil:{
                    select:{
                        tipo:true,
                        nome:true
                    }
                },
                departamento:{
                    select:{
                        nome:true
                    }
                },
                setor:{
                    select:{
                        nome:true
                    }
                }
            },
            orderBy:{
                ativo:'desc'
            }
        })
        return usuario
    }
}