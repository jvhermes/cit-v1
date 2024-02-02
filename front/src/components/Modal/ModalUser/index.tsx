import styles from "./styles.module.scss"
import Modal from 'react-modal'
import { setupAPIClient } from "../../../services/api"
import { FormEvent, useState } from "react"
import { PerfilListProps } from "../../../pages/prefeitura/user"
import { ItemCadastroProps } from "../../../pages/prefeitura"
import { toast } from "react-toastify"
import { Input, Button, Form, Dropdown, Image } from "semantic-ui-react"
import { FiX } from "react-icons/fi"


interface ModalConfirmProps {
    isOpen: boolean;
    onRequestClose: () => void;
    perfilList: PerfilListProps[];
    setorList: ItemCadastroProps[];
    departamentoList: ItemCadastroProps[];

}

export function ModalUser({ isOpen, onRequestClose, perfilList, setorList, departamentoList }: ModalConfirmProps) {

    const [nome, setNome] = useState("")
    const [senha, setSenha] = useState("")
    const [email, setEmail] = useState("")

    const [value, setValue] = useState("")

    const [perfilSelect, setPerfilSelect] = useState(0)
    const [setorSelect, setSetorSelect] = useState(0)
    const [departametoSelect, setDepartamentoSelect] = useState(0)

    const [perfis, setPerfis] = useState(perfilList || [])
    const [departamentos, setDepartamentos] = useState(departamentoList || [])
    const [setores, setSetores] = useState(setorList || [])

    const [showDepartamento, setShowDepartamento] = useState(false)
    const [showSetor, setShowSetor] = useState(false)

    async function handleNewUser(event: FormEvent) {

        event.preventDefault()

        const apiClient = setupAPIClient();

        const perfil_id = perfis[perfilSelect].id;
        const departamento_id = departamentos[departametoSelect].id;
        const setor_id = setores[setorSelect].id;
        const avatar = value

        if (nome === "" || email === "" || senha === "" || value === "") {
            toast.error("campos não preenchidos")
            return

        }
        try {
            await apiClient.post("/usuario", {
                nome,
                email,
                senha,
                perfil_id,
                departamento_id,
                setor_id,
                avatar
            })
            location.reload()
        } catch (err) {
            toast.error("Não foi possível completar a ação")
            console.log(err.response)
        }

    }

    function hadleChangeValue(data: string) {
        setValue(data)
    }


    function handleChangeSetor(data) {
        setSetorSelect(data.value)
    }
    function handleChangeDepartamento(data) {
        setDepartamentoSelect(data.value)
    }
    function handleChangePerfil(data) {
        setPerfilSelect(data.value);

        if (perfis[data.value].nome === "admin") {
            setShowDepartamento(false)
            setShowSetor(false)
        }

        if (perfis[data.value].nome === "prefeitura") {
            setShowDepartamento(false)
            setShowSetor(true)
        }

        if (perfis[data.value].nome === "cartorio") {
            setShowDepartamento(true)
            setShowSetor(false)
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
            width: "960px",
            height: "670px",
            maxWidth: "90vw",
            maxHeight: "85vh"

        }
    }
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>

            <div className={styles.container}>
                <div className={styles.title}>
                    <p><strong>Adicionar Usuário</strong></p>
                    <button onClick={onRequestClose} className="react-modal-close" style={{ background: "transparent", border: 0 }}>
                        <FiX size={22} color="#777" />
                    </button>
                </div>
                <div >
                    <Form onSubmit={handleNewUser} className={styles.content}>

                        <div className={styles.inputs}>
                            <Input type="text" placeholder="nome" value={nome} onChange={(e) => setNome(e.target.value)} icon="user" />
                            <Input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} icon="at" />
                            <Dropdown selection name="tipo" id="tipo" value={perfilSelect} onChange={(e, data) => handleChangePerfil(data)} options={
                                perfis.map((item, index) => {
                                    return (
                                        { key: item.id, value: index, text: item.nome }
                                    )
                                })
                            }>
                            </Dropdown>
                            {showSetor && (
                                <Dropdown selection name="setor" id="set" value={setorSelect} onChange={(e, data) => handleChangeSetor(data)} options={
                                    setores.map((item, index) => {
                                        return (
                                            { key: item.id, value: index, text: item.nome }
                                        )
                                    })
                                }>

                                </Dropdown>)}
                            {showDepartamento && (
                                <Dropdown selection name="departamento" id="dep" value={departametoSelect} onChange={(e, data) => handleChangeDepartamento(data)}
                                    options={
                                        departamentos.map((item, index) => {
                                            return (
                                                { key: item.id, value: index, text: item.nome }
                                            )
                                        })
                                    }>
                                </Dropdown >
                            )}
                        </div>

                        <div className={styles.avatar} >
                            <div>
                                <Image src="/avatar1.png" size="tiny" />
                                <Form.Radio  value={value} checked={value === "1"} onChange={() => hadleChangeValue("1")}> </Form.Radio>
                            </div>
                            <div>
                                <Image src="/avatar2.png" size="tiny" />
                                <Form.Radio  value={value} checked={value === "2"} onChange={() => hadleChangeValue("2")}> </Form.Radio>
                            </div>
                            <div>
                                <Image src="/avatar3.png" size="tiny" />
                                <Form.Radio  value={value} checked={value === "3"} onChange={() => hadleChangeValue("3")}> </Form.Radio>
                            </div>
                            <div>
                                <Image src="/avatar4.png" size="tiny" />
                                <Form.Radio  value={value} checked={value === "4"} onChange={() => hadleChangeValue("4")}> </Form.Radio>
                            </div>
                            <div>
                                <Image src="/avatar5.png" size="tiny" />
                                <Form.Radio  value={value} checked={value === "5"} onChange={() => hadleChangeValue("5")}> </Form.Radio>
                            </div>
                            <div>
                                <Image src="/avatar6.png" size="tiny" />
                                <Form.Radio  value={value} checked={value === "6"} onChange={() => hadleChangeValue("6")}> </Form.Radio>
                            </div>
                            <div>
                                <Image src="/avatar7.png" size="tiny" />
                                <Form.Radio  value={value} checked={value === "7"} onChange={() => hadleChangeValue("7")}> </Form.Radio>
                            </div>
                            <div>
                                <Image src="/avatar8.png" size="tiny" />
                                <Form.Radio  value={value} checked={value === "8"} onChange={() => hadleChangeValue("8")}> </Form.Radio>
                            </div>
                            <div>
                                <Image src="/avatar9.png" size="tiny" />
                                <Form.Radio  value={value} checked={value === "9"} onChange={() => hadleChangeValue("9")}> </Form.Radio>
                            </div>
                            <div>
                                <Image src="/avatar10.png" size="tiny" />
                                <Form.Radio  value={value} checked={value === "10"} onChange={() => hadleChangeValue("10")}> </Form.Radio>
                            </div>
                            <div>
                                <Image src="/avatar11.png" size="tiny" />
                                <Form.Radio  value={value} checked={value === "11"} onChange={() => hadleChangeValue("11")}> </Form.Radio>
                            </div>
                            <div>
                                <Image src="/avatar12.png" size="tiny" />
                                <Form.Radio  value={value} checked={value === "12"} onChange={() => hadleChangeValue("12")}> </Form.Radio>
                            </div>
                            <div>
                                <Image src="/avatar13.png" size="tiny" />
                                <Form.Radio  value={value} checked={value === "13"} onChange={() => hadleChangeValue("13")}> </Form.Radio>
                            </div>
                            <div>
                                <Image src="/avatar14.png" size="tiny" />
                                <Form.Radio  value={value} checked={value === "14"} onChange={() => hadleChangeValue("14")}> </Form.Radio>
                            </div>
                            <div>
                                <Image src="/avatar15.png" size="tiny" />
                                <Form.Radio value={value} checked={value === "15"} onChange={() => hadleChangeValue("15")}> </Form.Radio>
                            </div>
                            <div>
                                <Image src="/avatar16.png" size="tiny" />
                                <Form.Radio value={value} checked={value === "16"} onChange={() => hadleChangeValue("16")}> </Form.Radio>
                            </div>
                            <div>
                                <Image src="/avatar17.png" size="tiny" />
                                <Form.Radio  value={value} checked={value === "17"} onChange={() => hadleChangeValue("17")}> </Form.Radio>
                            </div>


                        </div>
                  
                        <div className={styles.adicionar}>
                            <Input type="password" placeholder="senha" value={senha} onChange={(e) => setSenha(e.target.value)} icon="lock" />
                            <Button color="blue" type="submit" >
                                Adicionar
                            </Button>

                        </div>
                    </Form>
                </div>
            </div>

        </Modal>
    )
}