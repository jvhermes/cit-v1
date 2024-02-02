import prismaCLient from "../../prisma";

interface SetorRequest{
    nome:string
}

export class CreateSetorService{
    async execute({nome}:SetorRequest){

        const setorExiste = await prismaCLient.setor.findFirst({
            where:{
                nome: nome
            }
        })

        if(setorExiste){
            throw new Error("departamento ja existe");
        }

        if(nome === ''){
            throw new Error("Nome invalido")
        }

        const setor = await prismaCLient.setor.create({
            data:{
                nome:nome
            }   
        })

        return setor
}}