import styles from "./styles.module.scss"
import { ItemCadastroProps, ItemLoteProps } from "../../../../pages/prefeitura"
import { useState } from "react"
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { setupAPIClient } from "../../../../services/api"
import { Descricao, Ids } from "./remembramento"
import { Dropdown, Input, Table, Button, Divider, Segment, Header, Icon  } from "semantic-ui-react"


import { toast } from "react-toastify"

interface NewProcessProps {
    
    tipo: ItemCadastroProps;
    setorList: ItemCadastroProps[];
    loteList: ItemLoteProps[];
 
   
}

export function DesmembramentoCartorio({  tipo, setorList, loteList, }: NewProcessProps) {

    const tipo_id = tipo.id;

    const [lote_id, setLote_id] = useState<Ids[]>([])
    const [observacao, setObservacao] = useState("")

    const [setores, setSetores] = useState(setorList || []);
    const [selectSetor, setSelectSetor] = useState(0)

    const [numLotes, setNumLotes] = useState(0)
    const [descricaoLote, setDescricao] = useState<Descricao[]>([])

    const [file, setFile] = useState(null)
    const [fileOriginalName, setFileOriginalName] = useState("")

    const [endereco, setEndereco] = useState("")
    const [matricula, setMatricula] = useState("")
    const [area, setArea] = useState("")


    const [selectInsc, setSelectInsc] = useState("")
    const [selectQuadra, setSelectQuadra] = useState("")
    const [selectLote, setSelectLote] = useState("")
    const [selectCodigo, setSelectCodigo] = useState("")


    //bairros unicos
    const bairros = loteList.map((item) => {
        return item.bairro
    })


    const filteredBairros = bairros.filter((item, index) => {
        return bairros.indexOf(item) === index && item
    }).sort();

    const [selectBairro, setSelectBairro] = useState(filteredBairros[0])

    //quadras por bairro unicas 
    const quadrasPorBairro = loteList.filter((item) => {

        const searchBairro = selectBairro;
        const bair = item.bairro;

        return searchBairro && bair.includes(searchBairro);
    })

    const quadras = quadrasPorBairro.map((item) => {
        return item.quadra
    })


    const filtredQuadra = quadras.filter((item, index) => {

        return quadras.indexOf(item) === index && item
    }).sort();


    //lote por bairro e quadra 

    const lotePorBairroeQuadra = loteList.filter((item) => {

        const searchBairro = selectBairro;
        const bair = item.bairro;

        const searchQuadra = selectQuadra;
        const qua = item.quadra;

        const searchinsc = selectInsc;
        const inscri = item.insc_imob;

        const searchcod = selectCodigo;
        const cod = item.codigo_imovel;

        if (searchinsc) {
            return inscri.includes(searchinsc)
        }

        if (searchcod) {
            return cod.includes(searchcod)
        }

        return searchBairro && bair.includes(searchBairro) && searchQuadra && qua.includes(searchQuadra);
    }).sort((a, b) => (a.lote > b.lote) ? 1 : -1);;

    function handleMinus() {
        if (numLotes === 0) {
            return
        }
        descricaoLote.pop()
        setNumLotes(numLotes - 1)
    }

    function handlePlus() {
        if (numLotes === 10) {

            return
        }

        descricaoLote.push({
            area: "",
            lote: "",
            testada: ""
        })
        setNumLotes(numLotes + 1)
    }



    async function handleChangeLote(data){
        setSelectLote(data.value)
        if(data.value == ""){
            lote_id.pop()
            setArea("")
            setEndereco("")
            return
        }else{
            const apiClient = setupAPIClient()
            const id = data.value

            const response = await apiClient.get("/lote/unico", {
                params: {
                    id: id
                }
            })

            const loteUnico: ItemLoteProps = response.data
            lote_id.push({ id: loteUnico.id })
            setArea(loteUnico.area_total)
            setEndereco(`${loteUnico.logradouro}, Número: ${loteUnico.numero}`)

        }
        
    }

    function handleChangeSetor(data) {
        setSelectSetor(data.value)
    }

    function handleChangeBairro(data) {
        setSelectBairro(data.value)
    }

    function handleChangeQuadra(data) {
        setSelectQuadra(data.value)
    }


    function handleChangeInsc(data) {
        setSelectInsc(data.value)

    }
    function handleChangeCod(data) {
        setSelectCodigo(data.value)

    }


    function handleChangeLoteDesc(e, index) {
        descricaoLote[index].lote = e.target.value
        setDescricao([...descricaoLote])
    }
    function handleChangeAreaDesc(e, index) {
        descricaoLote[index].area = e.target.value
        setDescricao([...descricaoLote])
    }
    function handleChangeTestadaDesc(e, index) {
        descricaoLote[index].testada = e.target.value
        setDescricao([...descricaoLote])
    }

    async function handleNewProcess() {

   
        const apiClient = setupAPIClient()

        const setor_id = setores[selectSetor].id
        const prazo = 180

        const response = await apiClient.get("/me")
        const { departamento_id } = response.data;

        const tipoLote = true
        const descricaoPessoa = []
        try {
            await apiClient.post("/processocartorio", {
                observacao, prazo, descricaoPessoa, descricaoLote, lote_id,
                setor_id, departamento_id, tipo_id,tipoLote
            })
            location.reload()
        } catch(err) {
            console.log(err)
            toast.error("Erro ao enviar processo")
        }

    }

    return (
        <div className={styles.container}>
            <div className={styles.filter}>
                <p><strong>Opções de Filtro:</strong></p>
                <div className={styles.filterTopSide}>

                    <div className={styles.cardFiltro}>
                        <div>
                            <label htmlFor="bairro">Bairro:</label>
                            <Dropdown clearable id="bairro" search selection options={
                                filteredBairros.map((item, index) => {
                                    return (
                                        { key: index, value: item, text: item }
                                    )
                                })
                            } value={selectBairro} onChange={(e, data) => handleChangeBairro(data)}>
                            </Dropdown>
                        </div>

                        <div className={styles.cardFiltroBaixo}>
                            <label htmlFor="quadra">Quadra:</label>
                            <Dropdown id="quadra" selection value={selectQuadra} onChange={(e, data) => handleChangeQuadra(data)} options={
                                filtredQuadra.map((item, index) => {
                                    return (
                                        { key: index, value: item, text: item }
                                    )
                                })
                            }>
                            </Dropdown>
                        </div>

                    </div>
                    <div className={styles.cardFiltro}>
                        <label htmlFor="inscricao">Insc. Imobiliaria:</label>
                        <Input type="search" list="insc" id="inscricao" value={selectInsc} onChange={(e, data) => handleChangeInsc(data)} />
                        <datalist id="insc" >
                            {loteList.map((item) => {
                                return (
                                    <option key={item.id} value={item.insc_imob}></option>
                                )
                            })}
                        </datalist>
                    </div>
                    <div className={styles.cardFiltro}>
                        <label htmlFor="codigo_imovel">Cod. Imóvel:</label>
                        <Input type="search" list="codigo" id="codigo_imovel" value={selectCodigo} onChange={(e, data) => handleChangeCod(data)} />
                        <datalist id="codigo" >
                            {loteList.map((item) => {
                                return (
                                    <option key={item.id} value={item.codigo_imovel}></option>
                                )
                            })}
                        </datalist>
                    </div>
                </div>
                <div className={styles.filterBottonSide}>
                    <div className={styles.lotes}>
                        <label htmlFor="lotes">Lotes:</label>
                        <Dropdown clearable selection id="lotes" value={selectLote} options={lotePorBairroeQuadra.map((item) => {
                            return (
                                { key: item.id, value: item.id, text: item.lote }
                            )
                        })} onChange={(e, data) => handleChangeLote(data)}>
                        </Dropdown>
                    </div>

                </div>
            </div>
            <div className={styles.divider}>
                <Divider ></Divider>
            </div>
            <div className={styles.selecao}>
                <p><strong>Seleção:</strong></p>
                <ul>
                    <li>
                        <div>
                            <label htmlFor="matricula">Matrícula</label>
                            <textarea id="matricula" name="matricula" value={matricula} readOnly={true}></textarea>

                        </div>
                        <div>
                            <label htmlFor="endereco">Endereço</label>
                            <textarea id="endereco" name="endereco" value={endereco} className={styles.endereco} readOnly={true}></textarea>
                        </div>
                        <div>
                            <label htmlFor="area">Area</label>
                            <textarea id="area" name="area" value={area} readOnly={true}></textarea>
                        </div>
                    </li>
                </ul>
            </div>

            <div className={styles.divider}>
                <Divider ></Divider>
            </div>
            <div className={styles.description}>
                <p><strong>Descrição:</strong></p>
                <div className={styles.number}>
                    <span>Número de Lotes: {numLotes}</span>
                    <Button size="mini" onClick={handlePlus}><AiOutlinePlus size={20}  /></Button>
                    <Button size="mini" onClick={handleMinus}><AiOutlineMinus size={20} /></Button>
                </div>
                <div className={styles.tableContainer}>
                    <Table textAlign="center" celled size="large" className={styles.table}>
                        <Table.Header >
                            <Table.Row >
                                <Table.HeaderCell>Lote</Table.HeaderCell>
                                <Table.HeaderCell>Area</Table.HeaderCell>
                                <Table.HeaderCell>Testada</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {descricaoLote.map((item, index) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell><Input type="text" value={item.lote} onChange={(e) => handleChangeLoteDesc(e, index)} placeholder='ex: "00-X"' /></Table.Cell>
                                        <Table.Cell><Input type="text" value={item.area} onChange={(e) => handleChangeAreaDesc(e, index)} placeholder='ex: "000.00"' /></Table.Cell>
                                        <Table.Cell><Input type="text" value={item.testada} onChange={(e) => handleChangeTestadaDesc(e, index)} placeholder='ex: "00.00"' /></Table.Cell>
                                    </Table.Row>
                                )
                            })}

                        </Table.Body>
                    </Table>
                </div>

                <textarea name="observacao" placeholder="Observação" value={observacao} maxLength={340} onChange={(e) => setObservacao(e.target.value)} ></textarea>

            </div>
            <div className={styles.divider}>
                <Divider ></Divider>
            </div>
            <div className={styles.final}>
                <p><strong>Finalizar:</strong></p>
                <div className={styles.finalContent}>
                <div className={styles.segment}>
                        <p className={styles.anexar}>Anexar arquivo:</p>
                        <label className={styles.pdfLabel}>
                            <p className={styles.pdfName}>
                                {fileOriginalName}
                            </p>
                            <span className={styles.pdfUpload}>
                                Escolher Arquivo
                                <Icon name="file pdf outline"></Icon>
                            </span>
                            <input type="file" accept=".pdf"  />
                        </label>
                    </div>
                    <div className={styles.encaminhar}>
                        <label htmlFor="encaminhar">Encaminhar para: </label>
                        <Dropdown id="encaminhar" selection onChange={(e, data) => handleChangeSetor(data)} value={selectSetor} options={
                            setores.map((item, index) => {
                                return (
                                    { key: item.id, value: index, text: item.nome }
                                )
                            })
                        }>

                        </Dropdown>
                        <div className={styles.enviarBox}>
                            <Button color="blue" onClick={handleNewProcess} className={styles.enviar}>Enviar</Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}