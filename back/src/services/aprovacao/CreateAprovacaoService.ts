import moment from "moment";
import prismaCLient from "../../prisma";

type DescricaoRequest = {
    matricula:string;
    data_registro:string;
    transcricao:string;
    descricao_id:string;
    lote:string
}

interface AprovacaoRequest{
    observacao: string;
    processo_id:number ;
    descricao: DescricaoRequest[];
    setor_id:string;
   
    alvara:string;
    atraso:boolean
  }


export class CreateAprovacaoService{
    async execute({descricao,observacao,processo_id,alvara,atraso,setor_id}:AprovacaoRequest){
        const dataAtual = Date();
        const data = moment(dataAtual)

        const aprovacaoExiste = await prismaCLient.aprovacaoCartorio.findFirst({
            where:{
                processo_id: processo_id
            }
        })

        if(aprovacaoExiste){
            throw new Error("Esse processo já foi respondido")
        }


        const aprovacao = await prismaCLient.aprovacaoCartorio.create({
            data:{
                observacao:observacao,
                processo_id:processo_id,
                alvara:alvara
            }
        })
        

        for await (let item of descricao){
            await prismaCLient.aprovacaoDescricao.create({
                data:{
                    descricao_id:item.descricao_id,
                    transcricao:item.transcricao,
                    data_registro:item.data_registro,
                    matricula:item.matricula,
                    aprovacao_id:aprovacao.id,
                    lote:item.lote,
                }
            })
        }
        
        await prismaCLient.processoPrefeitura.update({
            where:{
                id:processo_id
            },
            data:{
                respondido:true,
                atrasado:atraso,
                respondido_em:data.format("DD/MM/YYYY"),
                setor_fonte_id:setor_id,
            }
        })


        return aprovacao ;

    }
}