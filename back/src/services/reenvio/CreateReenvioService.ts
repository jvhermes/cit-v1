import prismaCLient from "../../prisma";

interface ReenvioRequest{
    observacao:string;
    aprovacao_id: string;
    setor_id: string;
    nome:string;
    enviado_de:string;
    processo_id:number;
    tipoLote:boolean;
}

export class CreateReenvioService{
    async execute({observacao,aprovacao_id,setor_id,nome,enviado_de,processo_id,tipoLote}: ReenvioRequest){


        if(tipoLote){
            const reenvio = await prismaCLient.reenvio.create({
                data:{
                    aprovacao_id:aprovacao_id,
                    observacao:observacao,
                    nome:nome,
                    enviado_de:enviado_de
                }
                
            })
            await prismaCLient.processoPrefeitura.update({
                where:{
                    id:processo_id
                },
                data:{
                    setor_fonte_id:setor_id
                }
            })
    
            return reenvio
        }else{
            const reenvio = await prismaCLient.reenvio.create({
                data:{
                    aprovacaoPessoa_id:aprovacao_id,
                    observacao:observacao,
                    nome:nome,
                    enviado_de:enviado_de
                }
                
            })
            await prismaCLient.processoPrefeitura.update({
                where:{
                    id:processo_id
                },
                data:{
                    setor_fonte_id:setor_id
                }
            })
    
            return reenvio
        }
   

   
    }
}