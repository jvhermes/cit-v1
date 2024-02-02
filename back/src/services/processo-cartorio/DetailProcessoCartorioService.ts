import prismaCLient from "../../prisma";

export class DetailProcessCartorioService{

    async execute(troca:number){
        
        const processo = await prismaCLient.processoCartorio.findFirst({
            where:{
                id: troca
            }, include:{
                tipo:true,
                departamento:true,
                descricaoPessoas:true,
                descricaoLotes:true,
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
                setor:true
                
            }
        })

        return processo ;
    }
}