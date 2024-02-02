import styles from "./styles.module.scss"
import Modal from 'react-modal'
import { setupAPIClient } from "../../../services/api"
import { useState } from "react"
import { Input, Button } from "semantic-ui-react"
import { toast } from "react-toastify"
import { FiX } from "react-icons/fi"


interface ModalConfirmProps {
    isOpen: boolean;
    onRequestClose: () => void;
    id: string;
}

export function ModalSenha({ isOpen, onRequestClose, id }: ModalConfirmProps) {

    const [senha, setNome] = useState("")

    async function handleUpdate() {
        const apiCliente = setupAPIClient();

        try {
            await apiCliente.put("/usuario/updatesenha", {
                id,
                senha
            })
            setNome("")
            location.reload()
        } catch {
            setNome("")
            toast.error("Erro na atualização")
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
            height: "230px"
        }
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>

            <div className={styles.container}>
                <div className={styles.title}>
                    <p><strong>Trocar Senha</strong></p>
                    <button onClick={onRequestClose} className="react-modal-close" style={{ background: "transparent", border: 0 }}>
                        <FiX size={22} color="#777" />
                    </button>
                </div>
                <div className={styles.content}>
                    <div>
                        <Input type="password" placeholder="Nova senha" value={senha} onChange={(e) => setNome(e.target.value)} />
                    </div>
                    <div className={styles.botao}>
                        <Button onClick={handleUpdate} color="blue">
                            Atualizar
                        </Button>
                        <Button onClick={onRequestClose} className="react-modal-close" >
                            Cancelar
                        </Button>
                    </div>

                </div>
            </div>

        </Modal>
    )
}