import prismaCLient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest{
    nome:string;
    email: string;
    id:string;
    avatar:string;
    ativo:boolean;
    departamento_id:string;
    perfil_id:string;
    setor_id:string;
}


export class UpdateUserService{
    async execute({nome,email,id,avatar,ativo,perfil_id,departamento_id,setor_id}: UserRequest){
        
        const usuarioExiste = await prismaCLient.usuario.findFirst({
            where:{
                    email : email,
                NOT:{
                    email:email,
                    id:id
                }
            }
        })

        if(usuarioExiste){
            throw new Error("Nome de usuario já cadastrado")
        }



        const usuario = await prismaCLient.usuario.update({
            where:{
                id:id
            },
            data:{
                nome: nome,
                email: email,
                avatar:avatar,
                ativo:ativo,
                setor_id:setor_id,
                departamento_id:departamento_id,
                perfil_id:perfil_id
            },
            select:{
                nome:true,
                email:true
            }
        })

        return {usuario}
    }
}