//Rotas de tarefas
const express = require("express");

const router = express.Router();
const tarefasController = require("../controllers/tarefas.controller");

const validar = require('../middlewares/validar');
const schemas = require('../middlewares/schemas');

router.get("/estatisticas", tarefasController.estatisticasTarefas);

router.get("/coluna/:coluna", tarefasController.listarPorColuna);
router.get("/prioridade/:prioridade", tarefasController.listarPorPrioridade);
router.get("/cidade/:cidade", tarefasController.listarPorCidade);

router.get("/", tarefasController.listarTarefas);
router.post("/", validar (schemas.tarefa), tarefasController.criarTarefa);
router.get("/:id", tarefasController.buscarPorId);
router.put("/:id", validar (schemas.tarefa), tarefasController.atualizarTarefa);
router.delete("/:id", tarefasController.deletarTarefa);

module.exports = router;
