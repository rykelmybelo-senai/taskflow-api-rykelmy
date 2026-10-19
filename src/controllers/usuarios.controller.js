const usuariosModel = require("../models/usuarios.model");
const criarErro = require("../utils/criarErro");


const usuariosController = {
  async listarUsuarios (req, res) {
    const { nome, email } = req.query;
    // Começar com todas os usuarios
    let resultadoUser = await usuariosModel.listarUsuarios(nome, email);

    if (resultadoUser.length === 0 && nome) {
      throw criarErro(404, "Nome não encontrado.");
    }
    if (resultadoUser.length === 0 && email) {
      throw criarErro(404, "Email não encontrado.");
    }
    if (!nome && !email && resultadoUser.length === 0) {
      throw criarErro(400, "Filtro inválido, busque por um nome ou email válido.");
    }

    res.json(resultadoUser);
  },

  async buscarUsuarioPorId (req, res) {
    const id = parseInt(req.params.id);
    const usuario = await usuariosModel.buscarUsuarioPorId(id);
    if (!usuario) {
      throw criarErro(404, "Usuário não encontrado!");
    }
    res.json(usuario);
  },

  async criarUsuario (req, res) {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha)
      throw criarErro(400, "Nome, email e senha são obrigatórios!");

    if (await usuariosModel.buscarUsuarioPorEmail(email))
      throw criarErro(400, "Email já cadastrado, informe outro email!");
    res
      .status(201)
      .json({
        mensagem: "Usuário criado com sucesso!",
        usuario: await usuariosModel.criarUsuario({ nome, email, senha }),
      });
  },

  async atualizarUsuario (req, res) {
    const id = parseInt(req.params.id);

    // Se não encontrou — retornar 404
    if (await usuariosModel.buscarUsuarioPorId(id) === undefined) {
      throw criarErro(404, "Usuário não encontrado");
    }
    // Retornar o usuario atualizado com status 200
    res.json({
      mensagem: "Usuário atualizado com sucesso",
      usuario: await usuariosModel.atualizarUsuario(id, req.body),
    });
  },

  async deletarUsuario (req, res) {
    const usuarioRemovido = await usuariosModel.deletarUsuario(
      parseInt(req.params.id),
    );

    if (!usuarioRemovido)
      throw criarErro(404, "Usuário não encontrado");
    res.json({ mensagem: "Usuário removido", usuario: usuarioRemovido });
  },
};

module.exports = usuariosController;
