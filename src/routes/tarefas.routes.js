//Rotas de tarefas
const express = require("express");

const router = express.Router();
const idValido = validar(schemas.id, "params");
const tarefasController = require("../controllers/tarefas.controller");

const validar = require('../middlewares/validar');
const schemas = require('../middlewares/schemas');
const autenticar = require("../middlewares/autenticar");

router.get("/estatisticas", tarefasController.estatisticasTarefas);

router.get("/coluna/:coluna", tarefasController.listarPorColuna);

router.get("/", tarefasController.listarTarefas);
router.post("/", autenticar, validar (schemas.tarefa), tarefasController.criarTarefa);
router.get("/:id", idValido, tarefasController.buscarPorId);
router.put("/:id", idValido, validar (schemas.tarefa), tarefasController.atualizarTarefa);
router.delete("/:id", idValido, tarefasController.deletarTarefa);

module.exports = router;
