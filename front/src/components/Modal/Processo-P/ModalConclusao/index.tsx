import styles from "./styles.module.scss"
import Modal from 'react-modal'
import { useState, useEffect } from "react"
import { setupAPIClient } from "../../../../services/api"
import { DescricaoAprovacao } from "../../../../pages/prefeitura"
import { Table, Dropdown, Button, Input, Checkbox, TextArea } from "semantic-ui-react"
import { ItemCadastroProps } from "../../../../pages/prefeitura"
import { FiX } from "react-icons/fi"
import { toast } from "react-toastify"



interface ModalConclusaoProps {
    isOpen: boolean;
    onRequestClose: () => void;
    processoId: number;
}



export function ModalConclusao({ isOpen, onRequestClose, processoId }: ModalConclusaoProps,) {

    const [conclusao, setConclusao] = useState("")


    function handleChangeConclusao(data) {
        setConclusao(data.value)
    }



    async function handleClose() {

        const id = processoId
        const apiCliente = setupAPIClient();

        await apiCliente.put("/processo/fechar", {
            id, conclusao
        })
        location.reload()
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
            width: "850px",
            height: "350px"
        }
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>

            <div className={styles.container}>
                <div className={styles.title}>
                    <p><strong>Concluir Processo</strong></p>
                    <button onClick={onRequestClose} className="react-modal-close" style={{ background: "transparent", border: 0 }}>
                        <FiX size={22} color="#777" />
                    </button>
                </div>
                <div className={styles.content}>
                    <div className={styles.observacao}>
                        <label htmlFor="observacao"><strong>Observações finais:</strong></label>
                        <TextArea name="obs" id="observacao" value={conclusao} maxLength={435} onChange={(e, data) => handleChangeConclusao(data)}></TextArea>
                    </div>
                    <div className={styles.enviar}>

                        <div>

                            <Button color="blue" onClick={() => handleClose()} className={styles.enviar}>Concluir</Button>
                        </div>


                    </div>
                </div>
            </div>
        </Modal>
    )

}


