import prismaCLient from "../../prisma";

export class DetailUserExtService{
    async execute(id: string){
        
        const usuario = await prismaCLient.usuario.findFirst({
            where:{
                id: id
            },select:{
                id:true,
                nome: true,
                email: true,
                avatar:true,
                ativo:true,
                perfil:true,
                departamento:true,
                setor:true,

            }
        })

        return{
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            avatar:usuario.avatar,
            ativo:usuario.ativo,
            departamento:usuario.departamento.nome,
            setor:usuario.setor.nome,
            nome_tipo:usuario.perfil.nome,
            setor_id:usuario.setor.id,
            departamento_id:usuario.departamento.id
        }
    }
}