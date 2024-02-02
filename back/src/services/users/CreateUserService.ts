import prismaCLient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest{
    nome:string;
    email: string;
    senha: string;
    setor_id:string;
    departamento_id:string;
    perfil_id:string;
    avatar:string;

}

export class CreateUserService{
    async execute({nome,email,senha,setor_id,departamento_id,perfil_id,avatar}: UserRequest){
        
        const usuarioExiste = await prismaCLient.usuario.findFirst({
            where:{
                email : email
            }
        })

        if(usuarioExiste){
            throw new Error("Nome de usuario já cadastrado")
        }

        const senhaHash = await hash(senha, 8)

        const usuario = await prismaCLient.usuario.create({
            data:{
                nome: nome,
                email: email,
                setor_id:setor_id,
                departamento_id:departamento_id,
                perfil_id:perfil_id,
                avatar:avatar,
                senha: senhaHash,
            },
            select:{
                nome:true,
                email:true
            }
        })

        return {usuario}
    }
}