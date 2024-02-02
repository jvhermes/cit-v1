import prismaCLient from "../../prisma";

interface SetorRequest{
    id: string;
}

export class DeleteSetorService{
    async execute({id}:SetorRequest){

        const setor = await prismaCLient.setor.delete({
            where:{
                id:id,
            }
        })

        return setor;

    }
}