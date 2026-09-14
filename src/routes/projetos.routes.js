const express = require("express");

const router = express.Router();
const projetosController = require("../controllers/projetos.controller");

const validar = require('../middlewares/validar');
const schemas = require('../middlewares/schemas');
const autenticar = require("../middlewares/autenticar");

router.get("/", projetosController.listarProjetos);
router.post("/", autenticar, validar(schemas.projeto), projetosController.criarProjeto);
router.get("/:id", projetosController.buscarProjetoPorId);
router.put("/:id", autenticar, validar(schemas.projeto), projetosController.atualizarProjeto);
router.delete("/:id", autenticar, projetosController.deletarProjeto);

module.exports = router;