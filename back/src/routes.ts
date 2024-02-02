import { Router , Request, Response} from "express";

import multer from "multer";

import { CreateTipoController } from "./controllers/tipos/CreateTipoController";
import { ListTipoController } from "./controllers/tipos/ListTipoController";
import { DeleteTipoController } from "./controllers/tipos/DeleteTipoController";
import { UpdateTipoController } from "./controllers/tipos/UpdateTipoController";

import { CreatePerfilController } from "./controllers/perfil/CreatePerfilController";
import { ListPerfilController } from "./controllers/perfil/ListPerfilController";
import { DeletePerfilController } from "./controllers/perfil/DeletePerfilController";


import { CreateDepartamentoController } from "./controllers/departamentos/CreateDepartamentoController";
import { ListDepartamentoController } from "./controllers/departamentos/ListDepartamentoController";
import { DeleteDepartamentoController } from "./controllers/departamentos/DeleteDepartamentoController";
import { UpdateDepartamentoController } from "./controllers/departamentos/UpdateDepartamentoController";

import { CreateAtividadeController } from "./controllers/atividades/CreateAtividadeController";
import { ListAtividadeController } from "./controllers/atividades/ListAtividadeController";
import { DeleteAtividadeController } from "./controllers/atividades/DeleteAtividadeController";
import { UpdateAtividadeController } from "./controllers/atividades/UpdateAtividadeController";

import { AuthUserController } from "./controllers/users/AuthUserCrontroller";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { DetailUserController } from "./controllers/users/DetailUserController";
import { ListUsuarioController } from "./controllers/users/ListUserController";
import { DeleteUserController } from "./controllers/users/DeleteUserController";
import { UpdateUserController } from "./controllers/users/UpdateUserController";
import { UpdateSenhaController } from "./controllers/users/UptadeSenhaController";
import { DetailUserExtController } from "./controllers/users/DetailUserExtController";

import { ListProcessoGeralController } from "./controllers/processos-prefeitura/ListProcessoGeralController";
import { CreateProcessoController } from "./controllers/processos-prefeitura/CreateProcessoController";
import { CloseProcessoController } from "./controllers/processos-prefeitura/CloseProcessoController";
import { ListProcessoDepartamentoController } from "./controllers/processos-prefeitura/ListProcessoDepartamentoController";
import { DetailProcessController } from "./controllers/processos-prefeitura/DetailProcessController";
import { ListProcessoSetorController } from "./controllers/processos-prefeitura/ListProcessoController";
import { ListProcessoAdminController } from "./controllers/processos-prefeitura/ListProcessoAdminController";
import { ListProcessoAdminGeralController } from "./controllers/processos-prefeitura/ListProcessoAdminGeralController";


import { isLogged } from "./middlewares/isLogged";

import { CsvReader } from "./csv/CsvReader";
import { ListLoteController} from "./controllers/lotes/ListLoteController";
import { DeleteLoteController } from "./controllers/lotes/DeleteLoteController";
import { ListOneController } from "./controllers/lotes/ListOneController";

import { CreateSetorController } from "./controllers/setor/CreateSetorController";
import { ListSetorController } from "./controllers/setor/ListSetorController";
import { DeleteSetorController } from "./controllers/setor/DeleteSetorController";
import { UpdateSetorController } from "./controllers/setor/UpdateSetorController";

import { CreateAprovacaoController } from "./controllers/aprovacao/CreateAprovacaoController";
import { CreateAprovacaoPessoaController } from "./controllers/aprovacao/CreateAprovacaoPessoaController";

import { CreateProcessoCartorioController } from "./controllers/processo-cartorio/CreateProcessoC-Controller";
import { ListProcessoCarSetController } from "./controllers/processo-cartorio/ListProcessoCarSetController";
import { ListProcessoCarDepController } from "./controllers/processo-cartorio/ListProcessoCarDepController";
import { DetailProcessCartorioController } from "./controllers/processo-cartorio/DetailProcessCartorioController";
import { ListProcessoCartorioGeralController } from "./controllers/processo-cartorio/ListProcessoCarGeralController";
import { CloseProcessoCartorioController } from "./controllers/processo-cartorio/CloseProcessoCartorioController";
import { ListProcessoCartAdminController } from "./controllers/processo-cartorio/ListProcessoCarAdminController";
import { ListProcessoCartGeralAdminController } from "./controllers/processo-cartorio/ListProcessoCarAdminGeralController";

import { CreateReenvioController } from "./controllers/reenvio/CreateReenvioController";

import { DocPost } from "./pdf/DocPost";
import { DocRead } from "./pdf/DocGet";

const router = Router();
const multerConfig = multer();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


//ROTA PARA DOCS ANEXOS

router.post('/doc',upload.single('file'),new DocPost().read)
router.get('/doc',isLogged,new DocRead().read)

// ROTA PARA CARREGAR ARQUIVO DE LOTE

router.post('/lote',multerConfig.single('file'),new CsvReader().read)
router.get('/lote/lista',isLogged,new ListLoteController().handle)
router.delete('/lote',new DeleteLoteController().handle)
router.get('/lote/unico',isLogged,new ListOneController().handle)

//ROTAS DE USUARIO

router.post('/usuario', new CreateUserController().handle)
router.get('/me',isLogged, new DetailUserController().handle)
router.get('/usuario/lista',isLogged,new ListUsuarioController().handle)
router.get('/usuario',isLogged,new DetailUserExtController().handle)
router.delete('/usuario',isLogged,new DeleteUserController().handle)
router.put('/usuario/update',isLogged,new UpdateUserController().handle)
router.put('/usuario/updatesenha',isLogged,new UpdateSenhaController().handle)

//ROTA DE LOGIN

router.post('/login', new AuthUserController().handle)

//ROTAS DE DEPARTAMENTO

router.post('/departamento', new CreateDepartamentoController().handle)
router.get('/departamento/lista',isLogged, new ListDepartamentoController().handle)
router.delete('/departamento',isLogged,new DeleteDepartamentoController().handle)
router.put('/departamento/update',isLogged,new UpdateDepartamentoController().handle)


//ROTAS DE SETOR

router.post('/setor', new CreateSetorController().handle)
router.get('/setor/lista',isLogged, new ListSetorController().handle)
router.delete('/setor',isLogged,new DeleteSetorController().handle)
router.put('/setor/update',isLogged,new UpdateSetorController().handle)

//ROTAS DE ATIVIDADES

router.post('/atividade',isLogged, new CreateAtividadeController().handle)
router.get('/atividade/lista',isLogged,new ListAtividadeController().handle)
router.delete('/atividade',isLogged,new DeleteAtividadeController().handle)
router.put('/atividade/update',isLogged,new UpdateAtividadeController().handle)

//ROTAS DE PERFIS

router.post('/perfil',new CreatePerfilController().handle)
router.get('/perfil',new ListPerfilController().handle)
router.delete('/perfil',new DeletePerfilController().handle)


//ROTAS PARA TIPO DE PROCESSO - PREFEITURA

router.post('/tipo',isLogged,new CreateTipoController().handle)
router.put('/tipo/update',isLogged,new UpdateTipoController().handle)
router.delete('/tipo',isLogged,new DeleteTipoController().handle)
router.get('/tipo/lista',isLogged,new ListTipoController().handle)


//ROTAS PARA PROCESSO

router.post('/processo',isLogged,new CreateProcessoController().handle)
router.put('/processo/fechar',isLogged,new CloseProcessoController().handle)
router.get('/processo/lista/setor',isLogged,new ListProcessoSetorController().handle)
router.get('/processo/lista/departamento',isLogged,new ListProcessoDepartamentoController().handle)
router.get('/processo/geral',isLogged,new ListProcessoGeralController().handle)
router.get('/processo/detalhe',isLogged,new DetailProcessController().handle)

router.get('/processo/admin/lista',isLogged,new ListProcessoAdminController().handle)
router.get('/processo/admin/geral',isLogged,new ListProcessoAdminGeralController().handle)
//ROTAS PARA APROVACAO DE PROCESSO

router.post('/aprovacao',isLogged,new CreateAprovacaoController().handle)
router.post('/aprovacaopessoa',isLogged,new CreateAprovacaoPessoaController().handle)

//ROTAS PARA PROCESSO - CARTORIO 

router.post('/processocartorio',isLogged,new CreateProcessoCartorioController().handle)
router.get('/processocartorio/lista/setor',isLogged,new ListProcessoCarSetController().handle)
router.get('/processocartorio/lista/departamento',isLogged,new ListProcessoCarDepController().handle)
router.get('/processocartorio/detalhe',isLogged,new DetailProcessCartorioController().handle)
router.get('/processocartorio/geral',isLogged,new ListProcessoCartorioGeralController().handle)
router.put('/processocartorio/fechar',isLogged,new CloseProcessoCartorioController().handle)

router.get('/processocartorio/admin/lista',isLogged,new ListProcessoCartAdminController().handle)
router.get('/processocartorio/admin/geral',isLogged,new ListProcessoCartGeralAdminController().handle)
//ROTAS PARA REENVIO

router.post('/reenvio',isLogged, new CreateReenvioController().handle)
export {router};