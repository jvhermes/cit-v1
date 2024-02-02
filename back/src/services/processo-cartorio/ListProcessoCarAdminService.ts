import prismaCLient from "../../prisma";

export class ListProcessoCartorioAdminService{
    async execute(){
        
        const processo = await prismaCLient.processoCartorio.findMany({
            where:{
                ativo:true,
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