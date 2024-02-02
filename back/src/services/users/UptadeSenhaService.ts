import prismaCLient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest{
    senha:string
    id:string;
   
}

export class UpdateSenhaService{
    async execute({senha,id}: UserRequest){
        

        const senhaHash = await hash(senha, 8)

        const usuario = await prismaCLient.usuario.update({
            where:{
                id:id
            },
            data:{
               senha:senhaHash
            },
            select:{
                nome:true,
                email:true
            }
        })

        return {usuario}
    }
}