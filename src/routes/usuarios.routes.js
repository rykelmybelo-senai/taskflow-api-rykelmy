//Rotas de usuarios
const express = require("express");

const router = express.Router();
const usuariosController = require("../controllers/usuarios.controller");

const validar = require('../middlewares/validar');
const schemas = require('../middlewares/schemas');
const autenticar = require("../middlewares/autenticar");

router.get("/", usuariosController.listarUsuarios);
router.post("/", autenticar, validar(schemas.usuario), usuariosController.criarUsuario);
router.get("/:id", usuariosController.buscarUsuarioPorId);
router.put("/:id", autenticar, validar(schemas.usuario), usuariosController.atualizarUsuario);
router.delete("/:id", autenticar, usuariosController.deletarUsuario);

module.exports = router;
