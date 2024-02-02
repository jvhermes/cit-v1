import prismaCLient from "../../prisma";

interface ProcessoCarSetRequest{
    set: string;
}

export class ListProcessoCarSetService{
    async execute({set}:ProcessoCarSetRequest){
        
        const processo = await prismaCLient.processoCartorio.findMany({
            where:{
                ativo:true,
                setor:{
                    nome:set
                }
            },
            include:{
                departamento:true,
                descricaoPessoas:true,
                descricaoLotes:true,
                setor:true,
                tipo:true,
                lote: {
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
                },
            }
        })

        return processo
        
    }
}