import styles from "./styles.module.scss"
import Modal from 'react-modal'
import { ModalConclusao } from "../ModalConclusao"
import { useState } from 'react'
import { FiX } from "react-icons/fi"
import moment from "moment"
import { ItemCadastroProps, ItemProcessProps } from "../../../../pages/prefeitura"
import { ModalReenvio } from "../ModalReenvio"
import { ModalConfirm } from "../../Processo-Cartorio/ModalConfirmProcess"
import { Button, Table, Icon, Divider } from "semantic-ui-react"

import processoPdf from "../../../../pdf/processo"

interface ModalProcessProps {
    isOpen: boolean;
    onRequestClose: () => void;
    processo: ItemProcessProps;
    setorList: ItemCadastroProps[];
}

export function ModalProcess({ isOpen, onRequestClose, processo, setorList }: ModalProcessProps) {

    const [modalReenvioOpen, setModalReenvioOpen] = useState(false)
    const [modalConfirmOpen, setModalConfirmOpen] = useState(false)
    const [modalCloseOpen, setModalCloseOpen] = useState(false)

    const [id,setId] = useState("")

    function closeModal() {
        setModalReenvioOpen(false)
        setModalConfirmOpen(false)
        setModalCloseOpen(false)
    }
    async function handleClose() {

        setModalCloseOpen(true)
    }

    function setPressoPdf() {
        processoPdf({ processo })
    }

    function openModalConfirm() {
        setModalConfirmOpen(true)
    }

    function handleReenvio(){
        if(processo.tipoLote){
            setId(processo.aprovacao.id)
        }else{
            setId(processo.aprovacaoPessoa.id)
        }
        setModalReenvioOpen(true)
    }
    const dataAtual = moment()
    const data = moment(processo.prazo)

    const dataCalc = data.diff(dataAtual, 'days')



    const customStyles = {
        content: {
            top: "50%",
            bottom: "auto",
            left: "50%",
            rigth: "auto",
            padding: "0",
            transform: "translate(-50%,-50%)",
            backgroundColor: "#FFF",
            height: "720px",
            width: "800px",
        }
    }
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>

            <div className={styles.content}>
                <div className={styles.title}>
                    <p><strong>Detalhes do Processo</strong></p>
                    <button onClick={onRequestClose} className="react-modal-close" style={{ background: "transparent", border: 0 }}>
                        <FiX size={22} color="#777" />
                    </button>
                </div>
                <div className={styles.detalhes}>
                    <p>Número do Processo: <strong>{processo.num_processo} </strong></p>
                    <p>Criado em: <strong>{moment(processo.criado_em).format("DD/MM/YYYY")}</strong></p>
                    <p>Expira em: <strong>{moment(processo.prazo).format("DD/MM/YYYY")}</strong></p>
                    <p>Ano: <strong>{processo.ano}</strong></p>
                    <p>Enviado Para: <strong>{processo.departamento.nome}</strong></p>

                    {processo.respondido && (
                        <p className={styles.respondido}> Respondido em: <strong>  {processo.respondido_em}</strong> </p>
                    )}
                    {dataCalc > 0 && !processo.respondido && (
                        <p className={`${styles.prazo} ${styles.prazoAntes}`}> {dataCalc} dias restantes</p>
                    )}
                    {dataCalc < 0 && !processo.respondido && (
                        <p className={`${styles.prazoAtraso} ${styles.prazo}`}> {dataCalc.toString().slice(1)} dias de atraso</p>
                    )}
                    {dataCalc === 0 && !processo.respondido && (
                        <p className={`${styles.prazoUltimo} ${styles.prazo}`}> Último dia de prazo</p>
                    )}
                </div>
                <div className={styles.divider}>
                    <Divider ></Divider>
                </div>
                <div className={styles.descricao}>
                    {processo.tipoLote && (
                        <div>
                            <h3>Descrição enviada:</h3>
                            <div className={styles.tableContainer}>
                                <Table celled className={styles.table} >
                                    <Table.Header >
                                        <Table.Row>
                                            <Table.HeaderCell>Lote</Table.HeaderCell>
                                            <Table.HeaderCell>Area</Table.HeaderCell>
                                            <Table.HeaderCell>Testada</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {processo.descricaoLotes.map((item) => {
                                            return (
                                                <Table.Row key={item.id}>
                                                    <Table.Cell><span>{item.lote}</span></Table.Cell>
                                                    <Table.Cell><span>{item.area}</span></Table.Cell>
                                                    <Table.Cell><span>{item.testada}</span></Table.Cell>
                                                </Table.Row>
                                            )
                                        })}

                                    </Table.Body>
                                </Table>
                            </div>
                        </div>

                    )}
                    {!processo.tipoLote && (
                        <div>
                            <h3>Descrição enviada:</h3>
                            <div className={styles.tableContainer}>
                                <Table celled className={styles.table} >
                                    <Table.Header >
                                        <Table.Row>
                                            <Table.HeaderCell>Cpf</Table.HeaderCell>
                                            <Table.HeaderCell>Nome</Table.HeaderCell>
                                            <Table.HeaderCell>Email</Table.HeaderCell>
                                            <Table.HeaderCell>Telefone</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {processo.descricaoPessoas.map((item) => {
                                            return (
                                                <Table.Row key={item.id}>
                                                    <Table.Cell><span>{item.cpf}</span></Table.Cell>
                                                    <Table.Cell><span>{item.nome}</span></Table.Cell>
                                                    <Table.Cell><span>{item.email}</span></Table.Cell>
                                                    <Table.Cell><span>{item.telefone}</span></Table.Cell>
                                                </Table.Row>
                                            )
                                        })}

                                    </Table.Body>
                                </Table>
                            </div>
                        </div>

                    )}
                    <div >
                        <Divider ></Divider>
                    </div>

                    <h3>Lotes relacionados</h3>
                    {processo.lote.map((item, index) => {
                        return (
                            <div className={styles.lotes} key={index}>
                                <h3>Dados do lote {index + 1}</h3>
                                <p>Lote: <strong> {item.lote.lote} </strong> </p>
                                <p>Quadra: <strong> {item.lote.quadra}</strong></p>
                                <p>Bairro: <strong> {item.lote.bairro} </strong> </p>
                                <p>Inscrição Imobiliária: <strong> {item.lote.insc_imob} </strong> </p>
                                <p>Código do imóvel: <strong> {item.lote.codigo_imovel} </strong> </p>
                                <p>Proprietário: <strong> {item.lote.proprietario} </strong> </p>
                                <p>Número: <strong> {item.lote.numero} </strong> </p>
                                <p>Logradouro: <strong> {item.lote.logradouro} </strong> </p>
                            </div>
                        )
                    })}
                    <div >
                        <Divider ></Divider>
                    </div>
                    <h3>Observação de envio</h3>
                    <p className={styles.observacao}>{processo.texto}</p>
                </div>

                {processo.aprovacao && (
                    <div>
                        <div  className={styles.divider} >
                            <Divider></Divider>
                        </div>
                        <div className={styles.descricao}>
                            <div className={styles.descricaoResposta}>
                                <h2>Conclusão:</h2>
                                {processo.aprovacao.alvara && (
                                    <p className={styles.alvara}>Alvará de permissão: <strong>{processo.aprovacao.alvara}</strong></p>
                                )}
                                <h3>Nova(s) descrições do imóvel:</h3>
                                <div className={styles.tableContainer} >
                                    <Table celled className={styles.table2}>
                                        <Table.Header fullWidth>
                                            <Table.Row>
                                                <Table.HeaderCell>Lote</Table.HeaderCell>
                                                <Table.HeaderCell>Matricula</Table.HeaderCell>
                                                <Table.HeaderCell>Transcricao</Table.HeaderCell>
                                                <Table.HeaderCell>Data de Registro</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {processo.aprovacao.descricao.map((item, index) => {
                                                return (
                                                    <Table.Row key={index}>
                                                        <Table.Cell><span>{item.lote}</span></Table.Cell>
                                                        <Table.Cell><span>{item.matricula}</span></Table.Cell>
                                                        <Table.Cell><span>{item.transcricao}</span></Table.Cell>
                                                        <Table.Cell><span>{item.data_registro}</span></Table.Cell>
                                                    </Table.Row>
                                                )
                                            })}

                                        </Table.Body>
                                    </Table>
                                </div>
                                <h3>Observações do cartório</h3>
                                <p className={styles.observacao}>{processo.aprovacao.observacao}</p>
                            </div>

                            {processo.aprovacao.reenvio.map((item, index) => {
                                return (
                                    <div key={index} className={styles.reenvioContent} >
                                        <h3>Reenvio {index + 1} </h3>
                                        <div>
                                            <span>De:<strong> {item.enviado_de}</strong> </span>
                                            <br></br>
                                            <span>Para:<strong> {item.nome}</strong> </span>
                                        </div>
                                        <p className={styles.reenvio}>{item.observacao}</p>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                )}
                {processo.aprovacaoPessoa && (
                    <div className={styles.descricao}>
                        <div className={styles.descricaoResposta}>
                            <h2>Resposta:</h2>
                            <h3>Observações do cartório:</h3>
                            <p className={styles.observacao}>{processo.aprovacaoPessoa.observacao}</p>
                        </div>

                        {processo.aprovacaoPessoa.reenvio.map((item, index) => {
                            return (
                                <div key={index} className={styles.reenvioContent} >
                                    <h3>Reenvio {index + 1} </h3>
                                    <div>
                                        <span>De:<strong> {item.enviado_de}</strong> </span>
                                        <br></br>
                                        <span>Para:<strong> {item.nome}</strong> </span>
                                    </div>
                                    <p className={styles.reenvio}>{item.observacao}</p>
                                </div>
                            )
                        })}

                    </div>
                )}
                {!processo.ativo && processo.respondido && (
                    <div className={styles.finais}>
                        <h3>Observações finais:</h3>
                        <p className={styles.observacao}>{processo.conclusao}</p>
                    </div>
                )}
                {(!processo.respondido && !processo.ativo) && (
                    <div>
                        <p>
                            Processo Excluído antes de ser respondido
                        </p>
                    </div>
                )}

                {processo.ativo && processo.respondido && (
                    <div className={styles.button}>
                        <Button color="blue" onClick={() => handleClose()}>Concluir</Button>
                        <Button color="grey" onClick={() => handleReenvio()}>Repassar Internamente</Button>
                        <Button color="red" onClick={setPressoPdf} >
                            Gerar PDF
                            <Icon className={styles.buttonIcon} name="file pdf outline"></Icon>
                        </Button>
                    </div>
                )}
                {!processo.respondido && processo.ativo && (
                    <div className={styles.button}>
                        <Button color="red" onClick={() => openModalConfirm()} >Cancelar Envio</Button>
                    </div>
                )}
                {!processo.ativo && processo.respondido && (
                    <div className={styles.button}>
                        <Button color="red" onClick={setPressoPdf} >
                            Gerar PDF
                            <Icon className={styles.buttonIcon} name="file pdf outline"></Icon>
                        </Button>
                    </div>
                )}


            </div>
            {modalReenvioOpen && (
                <ModalReenvio isOpen={modalReenvioOpen} onRequestClose={closeModal} tipoLote={processo.tipoLote} idAprovacao={id} setorList={setorList} processo_id={processo.id} />

            )}
            {modalConfirmOpen &&
                (<ModalConfirm isOpen={modalConfirmOpen} onRequestClose={closeModal} id={processo.id} type={1} />
                )}
            {modalCloseOpen && (
                <ModalConclusao isOpen={modalCloseOpen} onRequestClose={closeModal} processoId={processo.id} />
            )}
        </Modal>
    )
}