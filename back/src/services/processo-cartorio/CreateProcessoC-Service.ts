import moment from "moment";
import prismaCLient from "../../prisma";


type DescricaoPessoaRequest = {
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
}
type DescricaoLoteRequest = {
    lote: string;
    area: string;
    testada: string;
}

type IdLoteRequest = {
    id: number
}
interface ProcessoRequest {


    observacao: string;
    setor_id: string;
    lote_id: IdLoteRequest[];
    tipo_id: string;
    departamento_id: string;
    tipoLote:boolean;
    doc_id:string;

    descricaoPessoa: DescricaoPessoaRequest[];
    descricaoLote: DescricaoLoteRequest[];
}


export class CreateProcessoCartorioService {
    async execute({ setor_id, lote_id, tipo_id, descricaoPessoa, descricaoLote, observacao, departamento_id,tipoLote,doc_id }: ProcessoRequest) {
        const dataAtual = Date();
        const dataAtualFormat = moment(dataAtual)


        const processo = await prismaCLient.processoCartorio.create({
            data: {
                setor_id: setor_id,
                tipo_id: tipo_id,
                criado_em: dataAtualFormat.format('YYYY-MM-DD'),
                observacao: observacao,
                departamento_fonte_id: departamento_id,
                tipoLote:tipoLote,
                doc_id:doc_id
            }
        })

        for await (let item of lote_id) {
            await prismaCLient.processoCartorioToLotee.create({
                data: {
                    processo_id: processo.id,
                    lote_id: item.id
                }
            })
        }

        if (!tipoLote) {
            for await (let item of descricaoPessoa) {
                await prismaCLient.descricaoPessoas.create({
                    data: {
                        nome: item.nome,
                        cpf: item.cpf,
                        email: item.email,
                        telefone: item.telefone,
                        processo_id: processo.id,
                    }
                })
            }
        }

        if (tipoLote) {
            for await (let item of descricaoLote) {
                await prismaCLient.descricaoLotes.create({
                    data: {
                        processoCartorio_id:processo.id,
                        lote: item.lote,
                        area: item.area,
                        testada: item.testada
                    }
                })
            }
        }


        return processo;

    }
}