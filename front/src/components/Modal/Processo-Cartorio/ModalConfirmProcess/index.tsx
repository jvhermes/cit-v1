import styles from "./styles.module.scss"
import Modal from 'react-modal'
import { setupAPIClient } from "../../../../services/api"
import { useState } from "react"

import { FiX } from "react-icons/fi"
import { toast } from "react-toastify"

import { Input, Button, List } from "semantic-ui-react"
import { ItemCadastroProps } from "../../../../pages/prefeitura"

interface ModalProcessProps {
    isOpen: boolean;
    onRequestClose: () => void;
    id: number;
    type: number;
}

export function ModalConfirm({ isOpen, onRequestClose, id, type }: ModalProcessProps) {

    const excluido = true
    async function handleDelete() {
        const apiCliente = setupAPIClient();
    
        if (type === 1) {
           
            const conclusao = "*excluído*"
            try {
                await apiCliente.put("/processo/fechar", {id,conclusao})
                
                location.reload()
            } catch(err) {
                console.log(err)
                toast.error("Não foi possível completar a ação")
            }


        }
        if (type === 2) {

            try {
                await apiCliente.put("/processocartorio/fechar", {
                  
                        id,
                        excluido
                  
                })

                location.reload()
            } catch {

                toast.error("Não foi possível completar a ação")
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
            backgroundColor: "#fff",
            width: "600px",
            height: "200px"
        }
    }
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <p><strong>Confirmar Exclusão</strong></p>
                    <button onClick={onRequestClose} className="react-modal-close" style={{ background: "transparent", border: 0 }}>
                        <FiX size={22} color="#777" />
                    </button>
                </div>
                <div className={styles.botao}>

                    <Button color="red" onClick={handleDelete}>Excluir</Button>
                    <Button color="grey"onClick={onRequestClose}>Cancelar </Button>
                </div>

            </div>
        </Modal>
    )
}
