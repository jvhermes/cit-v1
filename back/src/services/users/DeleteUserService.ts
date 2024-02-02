import prismaCLient from "../../prisma";

interface UserRequest{
    id: string;
}

export class DeleteUserService{
    async execute({id}:UserRequest){

        const usuario = await prismaCLient.usuario.delete({
            where:{
                id:id,
            },select:{
                nome:true,
                email:true,
                id:true,
            }
        })

        return usuario;

    }
}