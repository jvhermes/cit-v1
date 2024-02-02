import prismaCLient from "../../prisma";

interface ProcessoRequest{
    id:number,
    conclusao:string
}

export class CloseProcessoService{
    async execute({id,conclusao}:ProcessoRequest){
        
        const processo = await prismaCLient.processoPrefeitura.update({
            where:{id:id},
            data:{
                ativo:false,
                conclusao:conclusao
            }
        })

        return processo;

    }
}