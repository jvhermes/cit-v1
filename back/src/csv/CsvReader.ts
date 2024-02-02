import { Request, Response } from "express";
import prismaCLient from "../prisma";
import { Readable } from "stream"
import readLine from "readline"

interface Lote {
    codigo_imovel: string
    bairro: string
    quadra: string
    lote: string
    insc_imob: string
    proprietario: string
    area_total: string
    logradouro: string
    numero: string
    testada: string
    //matricula:string
}


export class CsvReader {
    async read(req: Request, res: Response) {

        const { buffer } = req.file;


        const readableFile = new Readable();

        readableFile.push(buffer);
        readableFile.push(null);

        let cod = 0
        let num = 0
        let bai = 0
        let qua = 0
        let lot = 0
        let insc = 0
        let prop = 0
        let area = 0
        let log = 0
        let tes = 0
        let matr = 0

        const fileLine = readLine.createInterface({
            input: readableFile
        })

        const lotes: Lote[] = []

        for await (let line of fileLine) {
            const fileLineSplit = line.toLowerCase().split(";")


            const indexCod = fileLineSplit.indexOf('"codigoimovel' || 'bic')
            const indexCod2 = fileLineSplit.indexOf('codigoimovel' || 'bic')
            const indexNum = fileLineSplit.indexOf('numerocorresp' || 'numerocorrespondente' || 'numero_predial')
            const indexBairro = fileLineSplit.indexOf('bairrocorresp' || 'bairrocorrespondente' || 'nome_bairro')
            const indexQuadra = fileLineSplit.indexOf('quadra')
            const indexLote = fileLineSplit.indexOf('lote')
            const indexInsc = fileLineSplit.indexOf('inscricaoimobiliaria' || 'inscimobiliaria' || 'inscimob' || 'inscricao')
            const indexProp = fileLineSplit.indexOf('proprietario' || 'nome_proprietario')
            const indexArea = fileLineSplit.indexOf('arealote' || 'area_terreno')
            const indexLogr = fileLineSplit.indexOf('nomelogradouro' ||'nome_logradouro')
            const indexTest = fileLineSplit.indexOf('testadaprincipal' || 'testada_principal')
            //const indexMatr = fileLineSplit.indexOf('matricula_numero')

            if (indexNum !== -1 && indexBairro !== -1 && indexQuadra !== -1 && indexLote !== -1 && indexInsc !== -1 && indexProp !== -1
                && indexArea !== -1 && indexLogr !== -1 && indexTest !== -1  /* && indexMatr !== -1*/) {

                if (indexCod !== -1) {
                    cod = indexCod
                    num = indexNum
                    bai = indexBairro
                    qua = indexQuadra
                    lot = indexLote
                    insc = indexInsc
                    prop = indexProp
                    area = indexArea
                    log = indexLogr
                    tes = indexTest
                    //matr = indexMatr

                    for await (let line of fileLine) {
                        const fileLineSplit2 = line.toLowerCase().split(";")
            
                        lotes.push({
                            codigo_imovel: fileLineSplit2[cod].slice(1),
                            insc_imob: fileLineSplit2[insc],
                            proprietario: fileLineSplit2[prop],
                            logradouro: fileLineSplit2[log],
                            area_total: fileLineSplit2[area],
                            quadra: fileLineSplit2[qua],
                            lote: fileLineSplit2[lot],
                            numero: fileLineSplit2[num],
                            bairro: fileLineSplit2[bai],
                            testada: fileLineSplit2[tes],
                            //matricula:fileLineSplit2[matr]
                        })
                    }


                    break;
                }

                if (indexCod2 !== -1) {

                    cod = indexCod2
                    num = indexNum
                    bai = indexBairro
                    qua = indexQuadra
                    lot = indexLote
                    insc = indexInsc
                    prop = indexProp
                    area = indexArea
                    log = indexLogr
                    tes = indexTest
                    //matr = indexMatr

                    for await (let line of fileLine) {
                        const fileLineSplit2 = line.toLowerCase().split(";")
            
                        lotes.push({
                            codigo_imovel: fileLineSplit2[cod].slice(1),
                            insc_imob: fileLineSplit2[insc],
                            proprietario: fileLineSplit2[prop],
                            logradouro: fileLineSplit2[log],
                            area_total: fileLineSplit2[area],
                            quadra: fileLineSplit2[qua],
                            lote: fileLineSplit2[lot],
                            numero: fileLineSplit2[num],
                            bairro: fileLineSplit2[bai],
                            testada: fileLineSplit2[tes],
                            //matricula:fileLineSplit2[matr]
                        })
                    }

                    break;
                }

            }
        }

   



        for await (let { codigo_imovel, insc_imob, proprietario, logradouro, area_total, quadra, lote, numero, bairro, testada,/*matricula */} of lotes) {

            const loteAlreadyExists = await prismaCLient.lote.findFirst({
                where: { codigo_imovel: codigo_imovel }
            })

            if (loteAlreadyExists) {
                try {
                    await prismaCLient.lote.update({
                        where: { codigo_imovel: codigo_imovel },
                        data: {
                            codigo_imovel: codigo_imovel,
                            numero: numero,
                            bairro: bairro,
                            quadra: quadra,
                            lote: lote,
                            insc_imob: insc_imob,
                            proprietario: proprietario,
                            area_total: area_total,
                            logradouro: logradouro,
                            testada: testada,
                            //matricula:matricula
                        }
                    })
                } catch (err) {
                    console.log(err)
                }

            } else {
                try {
                    await prismaCLient.lote.create({
                        data: {
                            codigo_imovel: codigo_imovel,
                            numero: numero,
                            bairro: bairro,
                            quadra: quadra,
                            lote: lote,
                            insc_imob: insc_imob,
                            proprietario: proprietario,
                            area_total: area_total,
                            logradouro: logradouro,
                            testada: testada,
                            //matricula:matricula
                        }
                    })

                } catch (err) {
                    console.log(err)
                }

            }

        }

        return res.json(lotes);

    }
}

