import prismaCLient from "../../prisma";

export class DetailProcessService{
    async execute(troca: number){
        
        const processo = await prismaCLient.processoPrefeitura.findFirst({
            where:{
                id: troca
            }, include:{
                atividade:true,
                tipo:true,
                departamento:true,
                setor:true
                ,lote:{
                    include:{
                        lote:{
                            select:{
                                bairro:true,
                                quadra:true,
                                lote:true,
                                proprietario:true,
                                numero:true,
                                area_total:true,
                                insc_imob:true,
                                codigo_imovel:true,
                                logradouro:true
                            }
                        }
                    }
                },descricaoLotes:true,
                descricaoPessoas:true,
                aprovacao:{
                    include:{
                        descricao:true,
                        reenvio:true
                    }
                },
                aprovacaoPessoa:{
                    include:{
                        reenvio:true
                    }
                }
                
                
            }
        })

        return processo ;
    }
}