const express = require("express");

const router = express.Router();
const projetosController = require("../controllers/projetos.controller");

const validar = require('../middlewares/validar');
const schemas = require('../middlewares/schemas');

router.get("/", projetosController.listarProjetos);
router.post("/", validar(schemas.projeto), projetosController.criarProjeto);
router.get("/:id", projetosController.buscarProjetoPorId);
router.put("/:id", validar(schemas.projeto), projetosController.atualizarProjeto);
router.delete("/:id", projetosController.deletarProjeto);

module.exports = router;