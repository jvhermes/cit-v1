import styles from "./styles.module.scss"
import Modal from 'react-modal'
import { useState, useEffect } from "react"
import { setupAPIClient } from "../../../../services/api"
import { DescricaoAprovacao } from "../../../../pages/prefeitura"
import { Table, Dropdown, Button, Input, Checkbox, TextArea } from "semantic-ui-react"
import { ItemCadastroProps } from "../../../../pages/prefeitura"
import { FiX } from "react-icons/fi"
import { toast } from "react-toastify"



interface ModalAprovacaoProps {
    isOpen: boolean;
    onRequestClose: () => void;
    setorList: ItemCadastroProps[];
    descricaoList: DescricaoAprovacao[];
    processoId: number;
    atrasado: boolean
}



export function ModalArovacao({ isOpen, onRequestClose, setorList, descricaoList, processoId, atrasado }: ModalAprovacaoProps,) {

    const [setores, setSetoress] = useState(setorList || []);
    const [selectSetor, setSelectSetor] = useState(0)
    const [observacao, setObservacao] = useState("")
    const [descricao, setDescricao] = useState(descricaoList || [])
    const [alvaraExiste, setAlvaraExiste] = useState(false)
    const [alvara, setAlvara] = useState("")


    function handleChangeMatricula(e, index) {
        descricao[index].matricula = e.target.value
        setDescricao([...descricao])
    }
    function handleChangeData(e, index) {
        descricao[index].data_registro = e.target.value
        setDescricao([...descricao])
    }
    function handleChangeTranscricao(e, index) {
        descricao[index].transcricao = e.target.value
        setDescricao([...descricao])
    }

    function handleChangeSetor(data) {
        setSelectSetor(data.value)
    }

    function changeAlvara() {
        setAlvaraExiste(!alvaraExiste)
    }

    function handleChangeObservacao(data) {
        setObservacao(data.value)
    }

    function handleChangeAlvara(data) {
        setAlvara(data.value)
    }


    async function handleNewAprovacao(atraso) {
        const apiClient = setupAPIClient()

        const setor_id = setores[selectSetor].id

        const processo_id = processoId



        if (descricao[0].data_registro === "" || descricao[0].transcricao === "" || descricao[0].matricula === "") {

            toast.error("campos não preenchidos")
            return
        }

        try {
            await apiClient.post("/aprovacao", {
                observacao, descricao, processo_id, alvara, atraso, setor_id
            })
            location.reload()
        } catch {
            toast.error("Erro ao enviar aprovacao")
        }

    }


    const customStyles = {
        content: {
            top: "50%",
            bottom: "auto",
            left: "50%",
            rigth: "auto",
            padding: "0",
            transform: "translate(-50%,-50%)",
            backgroundColor: "#FFF",
            width: "900px",
            height: "650px"
        }
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>

            <div className={styles.container}>
                <div className={styles.title}>
                    <p><strong>Novo Registro</strong></p>
                    <button onClick={onRequestClose} className="react-modal-close" style={{ background: "transparent", border: 0 }}>
                        <FiX size={22} color="#777" />
                    </button>
                </div>
                <div className={styles.content}>
                    <div className={styles.tabelaContainer}>
                        <Table className={styles.tabela}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Lote</Table.HeaderCell>
                                    <Table.HeaderCell>Matrícula Nova</Table.HeaderCell>
                                    <Table.HeaderCell>Data Registro</Table.HeaderCell>
                                    <Table.HeaderCell>Trasnc Anterior</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {descricao.map((item, index) => {
                                    return (
                                        <Table.Row key={index}>
                                            <Table.Cell><span>{item.lote}</span></Table.Cell>
                                            <Table.Cell><Input transparent type="text" placeholder='ex: "0000000"' value={item.matricula || ""} onChange={(e) => handleChangeMatricula(e, index)} /></Table.Cell>
                                            <Table.Cell><Input transparent type="date" value={item.data_registro || ""} onChange={(e) => handleChangeData(e, index)} /></Table.Cell>
                                            <Table.Cell><Input transparent type="text" placeholder='ex: "00000"' value={item.transcricao || ""} onChange={(e) => handleChangeTranscricao(e, index)} /></Table.Cell>
                                        </Table.Row>
                                    )
                                })}

                            </Table.Body>
                        </Table>
                    </div>
                    <div className={styles.observacao}>
                        <label htmlFor="observacao">Observação:</label>
                        <TextArea name="obs" id="observacao" value={observacao} maxLength={435} onChange={(e, data) => handleChangeObservacao(data)}></TextArea>
                    </div>
                    <div className={styles.enviar}>

                        {atrasado && (
                            <div className={styles.atraso}>
                                <label>Possui autorização da prefeitura?</label>
                                <Checkbox toggle onChange={() => changeAlvara()} ></Checkbox>
                                {alvaraExiste && (
                                    <div className={styles.atrasoContent}>
                                        <div className={styles.alvara}>
                                            <Input placeholder="Alvará de permissão" value={alvara} onChange={(e, data) => handleChangeAlvara(data)} />
                                        </div>
                                        <div className={styles.envio}>
                                            <label htmlFor="encaminhar">Encaminhar para (setores)</label>
                                            <Dropdown selection id="encaminhar" onChange={(e, data) => handleChangeSetor(data)} value={selectSetor} options={
                                                setores.map((item, index) => {
                                                    return (
                                                        { key: item.id, value: index, text: item.nome }
                                                    )
                                                })
                                            }>
                                            </Dropdown>
                                        </div>

                                        <Button color="blue" onClick={() => handleNewAprovacao(true)} >Enviar</Button>
                                    </div>
                                )}
                            </div>
                        )}
                        {!atrasado && (
                            <div>
                                <div className={styles.envio}>
                                    <label htmlFor="encaminhar">Encaminhar para (setores)</label>
                                    <Dropdown selection id="encaminhar" onChange={(e, data) => handleChangeSetor(data)} value={selectSetor} options={
                                        setores.map((item, index) => {
                                            return (
                                                { key: item.id, value: index, text: item.nome }
                                            )
                                        })
                                    }>
                                    </Dropdown>
                                </div>
                                <Button color="blue" onClick={() => handleNewAprovacao(false)} className={styles.enviar}>Enviar</Button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </Modal>
    )

}


