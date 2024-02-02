import prismaCLient from "../../prisma";

export class DeleteLoteService{
    async execute(){
        
        await prismaCLient.aprovacaoDescricao.deleteMany()
        await prismaCLient.aprovacaoPessoa.deleteMany()
        await prismaCLient.aprovacaoCartorio.deleteMany()
        await prismaCLient.processoCartorioToLotee.deleteMany()
        await prismaCLient.processoPrefeituraToLotee.deleteMany()
        await prismaCLient.descricaoLotes.deleteMany()
        await prismaCLient.descricaoPessoas.deleteMany()
        await prismaCLient.processoCartorio.deleteMany()
        await prismaCLient.processoPrefeitura.deleteMany()
        const lote = await prismaCLient.lote.deleteMany()

        return lote
    }
}