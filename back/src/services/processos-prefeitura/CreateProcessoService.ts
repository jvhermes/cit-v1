import moment from "moment";
import prismaCLient from "../../prisma";

type IdLoteRequest = {
    id: number
}

type DescricaoLoteRequest = {
    lote: string;
    area: string;
    testada: string;
}


type DescricaoPessoaRequest = {
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
}

interface ProcessoRequest {

    num_processo: string;
    prazo: number;
    atividade_id: string;
    departamento_id: string;
    lote_id: IdLoteRequest[];
    tipo_id: string;
    descricaoLotes: DescricaoLoteRequest[];
    descricaoPessoa: DescricaoPessoaRequest[];
    setor_id: string;
    ano: string;
    criado_em: string;
    tipoLote:boolean;
    texto:string;
    doc_id:string;
}


export class CreateProcessoService {
    async execute({ num_processo,tipoLote, prazo, atividade_id,texto, departamento_id,doc_id, lote_id, tipo_id, descricaoLotes, descricaoPessoa, setor_id, ano, criado_em }: ProcessoRequest) {
        const dataAtual = Date();
        const dataPrazo = moment(dataAtual).add(prazo, 'd');


        const processoExiste = await prismaCLient.processoPrefeitura.findFirst({
            where: {
                num_processo: num_processo
            }
        })

        if (processoExiste) {
            throw new Error("Processo ja existe")
        }


        const processo = await prismaCLient.processoPrefeitura.create({
            data: {
                num_processo: num_processo,
                prazo: dataPrazo.format('YYYY-MM-DD'),
                atividade_id: atividade_id,
                departamento_id: departamento_id,
                tipo_id: tipo_id,
                criado_em: criado_em,
                setor_fonte_id: setor_id,
                ano: ano,
                tipoLote:tipoLote,
                texto:texto,
                doc_id:doc_id
            }
        })


        for await (let item of lote_id) {
            await prismaCLient.processoPrefeituraToLotee.create({
                data: {
                    processo_id: processo.id,
                    lote_id: item.id
                }
            })
        }

        if (tipoLote) {
            for await (let item of descricaoLotes) {
                await prismaCLient.descricaoLotes.create({
                    data: {
                        processo_id: processo.id,
                        lote: item.lote,
                        area: item.area,
                        testada: item.testada
                    }
                })
            }
        }

        if (!tipoLote) {
            for await (let item of descricaoPessoa) {
                await prismaCLient.descricaoPessoas.create({
                    data: {
                        nome: item.nome,
                        cpf: item.cpf,
                        email: item.email,
                        telefone: item.telefone,
                        processoPrefeitura_id:processo.id
                    }
                })
            }
        }
        return processo;

    }
}