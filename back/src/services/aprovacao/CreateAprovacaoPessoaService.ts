import moment from "moment";
import prismaCLient from "../../prisma";



interface AprovacaoRequest{
    observacao: string;
    processo_id:number ;
    setor_id:string;
   
    alvara:string;
    atraso:boolean
  }


export class CreateAprovacaoPessoaService{
    async execute({observacao,processo_id,alvara,atraso,setor_id}:AprovacaoRequest){
        const dataAtual = Date();
        const data = moment(dataAtual)

        const aprovacaoExiste = await prismaCLient.aprovacaoPessoa.findFirst({
            where:{
                processo_id: processo_id
            }
        })

        if(aprovacaoExiste){
            throw new Error("Esse processo já foi respondido")
        }


        const aprovacao = await prismaCLient.aprovacaoPessoa.create({
            data:{
                observacao:observacao,
                processo_id:processo_id,
                alvara:alvara
            }
        })
        

        
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