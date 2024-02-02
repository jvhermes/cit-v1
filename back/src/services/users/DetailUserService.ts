import prismaCLient from "../../prisma";

export class DetailUserService{
    async execute(user_id: string){
        
        const usuario = await prismaCLient.usuario.findFirst({
            where:{
                id: user_id
            },select:{
                id:true,
                nome: true,
                email: true,
                departamento_id:true,
                setor_id:true,
                avatar:true,
                ativo:true,
                perfil:{
                    select:{
                        tipo:true,
                        nome:true,
                        admin:true
                    }
                },
                departamento:{
                    select:{
                        nome:true,
                        id:true
                    }
                },
                setor:{
                    select:{
                        nome:true,
                        id:true
                    }
                }
            }
        })

        return{
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            tipo:usuario.perfil.tipo,
            setor:usuario.setor.nome,
            departamento:usuario.departamento.nome,
            nome_tipo:usuario.perfil.nome,
            admin:usuario.perfil.admin,
            avatar:usuario.avatar,
            ativo:usuario.ativo,
            setor_id:usuario.setor.id,
            departamento_id:usuario.departamento.id
        }
    }
}