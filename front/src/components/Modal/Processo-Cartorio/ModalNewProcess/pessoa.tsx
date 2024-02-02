import styles from "./styles.module.scss"

import { useState } from "react"
import { setupAPIClient } from "../../../../services/api"
import { Dropdown, Input, Table, Button, Divider, Segment, Header, Icon } from "semantic-ui-react"
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { Ids } from "./remembramento"
import { ItemCadastroProps, ItemLoteProps } from "../../../../pages/prefeitura"
import { FiX } from "react-icons/fi"
import { toast } from "react-toastify"

type Descricao = {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
}

interface ModalNewProcessProps {
    setorList: ItemCadastroProps[];
    tipo: ItemCadastroProps;
    loteList: ItemLoteProps[];
}

export function PessoaCartorio({ setorList, tipo, loteList }: ModalNewProcessProps,) {

    const tipo_id = tipo.id
    const [lote_id, setLotesID] = useState<Ids[]>([])
    const [setores, setSetores] = useState(setorList || []);
    const [selectSetor, setSelectSetor] = useState(0)
    const [observacao, setObservacao] = useState("")

    const [file, setFile] = useState(null)
    const [fileOriginalName, setFileOriginalName] = useState("")


    const [numPessoas, setNumPessoas] = useState(0)
    const [descricaoPessoa, setDescricao] = useState<Descricao[]>([])


    const [endereco, setEndereco] = useState("")
    const [matricula, setMatricula] = useState("")
    const [area, setArea] = useState("")

    const [descricaoCod, setDescricaoCod] = useState(" ")
    const [descricaoProp, setDescricaoProp] = useState(" ")
    const [descricaoLotes, setDescricaoLote] = useState(" ")

    const [selectInsc, setSelectInsc] = useState("")
    const [selectQuadra, setSelectQuadra] = useState("")
    const [selectLote, setSelectLote] = useState("")
    const [selectCodigo, setSelectCodigo] = useState("")


    async function handleChangeLote(data) {
        setSelectLote(data.value)
        if (data.value == "") {
            lote_id.pop()
            setArea("")
            setEndereco("")
            return
        } else {
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
        const qua = item.quadra

        const searchinsc = selectInsc
        const inscri = item.insc_imob

        const searchcod = selectCodigo
        const cod = item.codigo_imovel

        if (searchinsc) {
            return inscri.includes(searchinsc)
        }

        if (searchcod) {
            return cod.includes(searchcod)
        }

        return searchBairro && bair.includes(searchBairro) && searchQuadra && qua.includes(searchQuadra);
    }).sort((a, b) => (a.lote > b.lote) ? 1 : -1);







    function handleMinus() {
        if (numPessoas === 0) {
            return
        }
        descricaoPessoa.pop()
        setNumPessoas(numPessoas - 1)
    }

    function handlePlus() {
        if (numPessoas === 5) {

            return
        }
        descricaoPessoa.push({
            nome: "",
            cpf: "",
            email: "",
            telefone: ""
        })
        setNumPessoas(numPessoas + 1)
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


    function handleChangeNomeDesc(e, index) {
        descricaoPessoa[index].nome = e.target.value
        setDescricao([...descricaoPessoa])
    }
    function handleChangeCpfDesc(e, index) {
        descricaoPessoa[index].cpf = e.target.value
        setDescricao([...descricaoPessoa])
    }
    function handleChangeEmailDesc(e, index) {
        descricaoPessoa[index].email = e.target.value
        setDescricao([...descricaoPessoa])
    }
    function handleChangeTelefoneDesc(e, index) {
        descricaoPessoa[index].telefone = e.target.value
        setDescricao([...descricaoPessoa])
    }

    async function handleNewProcess() {


        const apiClient = setupAPIClient()

        const setor_id = setores[selectSetor].id
        const prazo = 180

        const response = await apiClient.get("/me")
        const { departamento_id } = response.data;
        const tipoLote = false
        const descricaoLote = []

        try {
            await apiClient.post("/processocartorio", {
                observacao, prazo, descricaoPessoa, descricaoLote, lote_id,
                setor_id, departamento_id, tipo_id, tipoLote
            })
            location.reload()
        } catch {
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
                <div className={styles.pessoa}>
                    <div className={styles.number}>
                        <span>Número de Pessoas: {numPessoas}</span>
                        <Button size="mini" onClick={handlePlus}><AiOutlinePlus size={20} /></Button>
                        <Button size="mini" onClick={handleMinus}><AiOutlineMinus size={20} /></Button>
                    </div>

                    <div >
                        <ul className={styles.pessoaLista}>
                            {descricaoPessoa.map((item, index) => {
                                return (
                                    <li className={styles.pessoaDados} key={index}>
                                        <Input type="text" placeholder="nome" value={item.nome} onChange={(e) => handleChangeNomeDesc(e, index)} />
                                        <Input type="text" placeholder="cpf" value={item.cpf} onChange={(e) => handleChangeCpfDesc(e, index)} />
                                        <Input type="text" placeholder="email" value={item.email} onChange={(e) => handleChangeEmailDesc(e, index)} />
                                        <Input type="text" placeholder="telefone" value={item.telefone} onChange={(e) => handleChangeTelefoneDesc(e, index)} />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <textarea name="observacao" placeholder="Observação" value={observacao} maxLength={340} onChange={(e) => setObservacao(e.target.value)} ></textarea>
                </div>
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
                            <input type="file" accept=".pdf" />
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


