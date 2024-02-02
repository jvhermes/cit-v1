import prismaCLient from "../../prisma";
import moment from "moment";

interface ProcessoRequest{
    id:number;
    excluido:boolean;
}

export class CloseProcessoCartorioService{
    async execute({id,excluido}:ProcessoRequest){

        const dataAtual = Date();
        const data = moment(dataAtual)

        const excluidoText = "*excluido*"
        
        if(excluido === false){
            const processo = await prismaCLient.processoCartorio.update({
                where:{id:id},
                data:{
                    ativo:false,
                    respondido_em:data.format("DD/MM/YYYY")
                }
            })
            return processo;
        }
    
        if(excluido === true){
            const processo = await prismaCLient.processoCartorio.update({
                where:{id:id},
                data:{
                    ativo:false,
                    respondido_em:excluidoText
                }
            })
            return processo;
        }

        

    }
}