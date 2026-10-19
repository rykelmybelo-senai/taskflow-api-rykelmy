const jwt = require("jsonwebtoken");
const usuarioModel = require("../models/usuarios.model");
const criarErro = require("../utils/criarErro.js");

const authController = {
  async login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha)
      throw criarErro(400, "Email e senha são obrigatórios");

    const usuario = await usuarioModel.buscarUsuarioPorEmail(email);

    if (!usuario)
      throw criarErro(401, "Credenciais inválidas");

    // console.log("Usuario encontrado:", usuario);
    // console.log("Senha fornecida:", senha);
    if (usuario.senha_hash !== senha)
      throw criarErro(401, "Credenciais inválidas");

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );

    res.json({
      token,
      usuario: { id: usuario.id, nome: usuario.nome },
    });
  },
};

module.exports = authController;
