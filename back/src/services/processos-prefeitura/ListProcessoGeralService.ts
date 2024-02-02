import prismaCLient from "../../prisma";

interface ProcessRequest {
    set: string;
}

export class ListProcessoGeralService{
    async execute({ set }: ProcessRequest){
        
        const processo = await prismaCLient.processoPrefeitura.findMany({
            where:{
                ativo:false,
                setor: {
                    nome: set
                }
            },
            include:{
                atividade:true,
                tipo:true,
                departamento:true
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
                },descricaoPessoas:true,
                descricaoLotes:true
            },
            orderBy:{
                created_at:'desc'
            }
        })

        return processo
        
    }
}