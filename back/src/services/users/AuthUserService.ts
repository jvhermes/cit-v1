import prismaCLient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest{
    email: string;
    senha: string;
}


export class AuthUserService{
    async execute({email,senha}:AuthRequest){
        
        const usuario = await prismaCLient.usuario.findFirst({
            where:{
                email:email
            },select:{
                nome:true,
                email:true,
                senha:true,
                ativo:true,
                id:true,
                perfil:{
                    select:{
                        tipo:true,
                        
                    }
                }
            }
        })

        if(!usuario){
            throw new Error("Usuario nao cadastrado")
        }

        const senhaCorreta = await compare(senha, usuario.senha)

        if(!senhaCorreta){
            throw new Error("Senha incorreta")
        }

        if(!usuario.ativo){
            throw new Error("Usuario Inativo")
        }
        
        const token = sign({
            nome: usuario.nome,
            email: usuario.email,
            tipo:usuario.perfil.tipo
        },process.env.JWT_SECRET,
        {
            subject: usuario.id,
            expiresIn: '2d'
        }
        )

        return{
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            token:token,
            tipo:usuario.perfil.tipo,
          
        }
    }
}