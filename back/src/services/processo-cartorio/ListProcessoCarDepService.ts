import prismaCLient from "../../prisma";

interface ProcessoCarRequest{
    dep: string;
}

export class ListProcessoCarDepService{
    async execute({dep}:ProcessoCarRequest){
        
        const processo = await prismaCLient.processoCartorio.findMany({
            where:{
                ativo:true,
                departamento:{
                    nome:dep
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
            },
        })

        return processo
        
    }
}