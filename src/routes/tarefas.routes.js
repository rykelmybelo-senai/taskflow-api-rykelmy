//Rotas de tarefas
const express = require("express");
const router = express.Router();
const tarefasController = require("../controllers/tarefas.controller");

router.get("/estatisticas", tarefasController.estatisticasTarefas);

router.get("/", tarefasController.listarTarefas);
router.post("/", tarefasController.criarTarefa);
router.get("/:id", tarefasController.buscarPorId);
router.put("/:id", tarefasController.atualizarTarefa);
router.delete("/:id", tarefasController.deletarTarefa);

module.exports = router;
