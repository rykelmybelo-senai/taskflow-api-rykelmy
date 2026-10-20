const express = require("express");

const router = express.Router();
const prioridadesController = require("../controllers/prioridades.controller");

const validar = require('../middlewares/validar');
const schemas = require('../middlewares/schemas');
const autenticar = require("../middlewares/autenticar");

router.get("/", prioridadesController.listarPrioridades);
router.post("/", autenticar, validar(schemas.prioridade), prioridadesController.criarPrioridade);
router.get("/:id", prioridadesController.buscarPorId);
router.put("/:id", autenticar, validar(schemas.prioridade), prioridadesController.atualizarPrioridade);
router.delete("/:id", autenticar, prioridadesController.deletarPrioridade);

module.exports = router;
