const express = require("express");

const usuariosController = require("../controllers/usuarios.controller");
const validar = require("../middlewares/validar");
const schemas = require("../middlewares/schemas");
const autenticar = require("../middlewares/autenticar");

const router = express.Router();

const idValido = validar(schemas.id, "params");

router.get("/", usuariosController.listarUsuarios);

router.post(
  "/",
  autenticar,
  validar(schemas.usuario),
  usuariosController.criarUsuario,
);

router.get("/:id", idValido, usuariosController.buscarUsuarioPorId);

router.put(
  "/:id",
  autenticar,
  idValido,
  validar(schemas.usuario),
  usuariosController.atualizarUsuario,
);

router.delete("/:id", autenticar, idValido, usuariosController.deletarUsuario);

module.exports = router;
