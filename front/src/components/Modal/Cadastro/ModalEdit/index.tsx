import styles from "./styles.module.scss"
import Modal from 'react-modal'
import { setupAPIClient } from "../../../../services/api"
import { useState } from "react"
import { Input, Button } from "semantic-ui-react"
import { toast } from "react-toastify"
import { FiX } from "react-icons/fi"

interface ModalConfirmProps {
    isOpen: boolean;
    onRequestClose: () => void;
    id: string;
    index: number;
    type: number;
    nomeAtual: string;
}

export function ModalEditCadastro({ isOpen, onRequestClose, id, index, type, nomeAtual }: ModalConfirmProps) {

    const [nome, setNome] = useState(nomeAtual)

    async function handleDelete() {
        const apiCliente = setupAPIClient();
        if (type === 1) {
            try {
                await apiCliente.delete("/atividade", {
                    params: {
                        id: id
                    }
                })
                setNome("")
                location.reload()
            } catch (err) {
                console.log(err)
                setNome("")
                toast.error("Erro na atualização")
            }


        }
        if (type === 2) {
            try {
                await apiCliente.delete("/departamento", {
                    params: {
                        id: id
                    }
                })
                setNome("")
                location.reload()
            } catch {
                setNome("")
                toast.error("Erro na atualização")
            }

        }
        if (type === 3) {

            if (index === 0 || index === 1) {

                toast.error("Este campo não pode ser atualizado")

                return
            }
            try {
                await apiCliente.delete("/tipo", {
                    params: {
                        id: id
                    }
                })
                setNome("")
                location.reload()
            } catch {
                toast.error("Erro na atualização")
                setNome("")
            }

        }

        if (type === 4) {
            try {
                await apiCliente.delete("/setor", {
                    params: {
                        id: id
                    }
                })
                setNome("")
                location.reload()
            } catch {
                setNome("")
                toast.error("Erro na atualização")
            }

        }
    }
    async function handleUpdate() {
        const apiCliente = setupAPIClient();

        if (type === 1) {
            try {
                await apiCliente.put("/atividade/update", {
                    id,
                    nome
                })
                setNome("")
                location.reload()
            } catch (err) {
                console.log(err)
                setNome("")
                toast.error("Erro na atualização")
            }


        }
        if (type === 2) {
            try {
                await apiCliente.put("/departamento/update", {
                    id,
                    nome
                })
                setNome("")
                location.reload()
            } catch {
                setNome("")
                toast.error("Erro na atualização")
            }

        }
        if (type === 3) {

            if (index === 0 || index === 1) {

                toast.error("Este campo não pode ser atualizado")

                return
            }
            try {
                await apiCliente.put("/tipo/update", {
                    id,
                    nome

                })
                setNome("")
                location.reload()
            } catch {
                toast.error("Erro na atualização")
                setNome("")
            }

        }

        if (type === 4) {
            try {
                await apiCliente.put("/setor/update", {
                    id,
                    nome
                })
                setNome("")
                location.reload()
            } catch {
                setNome("")
                toast.error("Erro na atualização")
            }

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
            width: "400px",
            height: "250px"
        }
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>

            <div className={styles.container}>
                <div className={styles.title}>
                    <p><strong>Editar</strong></p>
                    <button onClick={onRequestClose} className="react-modal-close" style={{ background: "transparent", border: 0 }}>
                        <FiX size={22} color="#777" />
                    </button>
                </div>

                <div className={styles.content}>
                    <div>
                        <Input type="text" placeholder="Novo nome" value={nome} onChange={(e, data) => setNome(data.value)} />
                    </div>
                    <div className={styles.botao}>
                        <Button onClick={() => handleUpdate()} color="blue">
                            Atualizar
                        </Button>
                        <Button color="red" onClick={() => handleDelete()} className="react-modal-close" >
                            Excluir
                        </Button>
                    </div>
                </div>
            </div>


        </Modal>
    )
}