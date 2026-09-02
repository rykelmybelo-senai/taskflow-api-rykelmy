const express = require("express");
const router = express.Router();
const projetosController = require("../controllers/projetos.controller");

router.get("/", projetosController.listarProjetos);
router.post("/", projetosController.criarProjeto);
router.get("/:id", projetosController.buscarProjetoPorId);
router.put("/:id", projetosController.atualizarProjeto);
router.delete("/:id", projetosController.deletarProjeto);

module.exports = router;