import prismaCLient from "../../prisma";

export class ListProcessoAdminService {
    async execute() {

        const processo = await prismaCLient.processoPrefeitura.findMany({
            where: {
                ativo: true,
            },
            include: {
                atividade: true,
                tipo: true,
                departamento: true
                , lote: {
                    include: {
                        lote: {
                            select: {
                                bairro: true,
                                quadra: true,
                                lote: true,
                                proprietario: true,
                                numero: true,
                                area_total: true,
                                insc_imob: true,
                                codigo_imovel: true,
                                logradouro: true
                            }
                        }
                    }
                }, descricaoPessoas: true,
                descricaoLotes: true,
            }, orderBy: {
                created_at: 'desc'
            },



        })

        return processo

    }
}