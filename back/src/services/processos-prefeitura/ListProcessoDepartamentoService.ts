import prismaCLient from "../../prisma";

interface ProcessRequest{
    dep: string;
}

export class ListProcessoDepartamentoService{
    async execute({dep}:ProcessRequest){
        
        const processo = await prismaCLient.processoPrefeitura.findMany({
            where:{
                ativo:true,
                respondido:false,
                departamento:{
                    nome:dep
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
                },descricaoLotes:true,
                descricaoPessoas:true
                
            },
            orderBy:{
                created_at:'asc'
            }
       
        })

        return processo
        
    }
}