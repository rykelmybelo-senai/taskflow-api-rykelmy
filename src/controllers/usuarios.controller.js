const usuariosModel = require("../models/usuarios.model");
const criarErro = require("../utils/criarErro");

// Função utilitária para garantir que a senha nunca seja exposta no JSON
function removerSenha(usuario) {
  if (!usuario) return null;
  const { senha_hash, senha, ...resto } = usuario;
  return resto;
}

const usuariosController = {
  async listarUsuarios(req, res) {
    const { nome, email } = req.query;
    const usuarios = await usuariosModel.listarUsuarios(nome, email);

    if (nome && usuarios.length === 0) {
      throw criarErro(404, "Nome não encontrado.");
    }
    if (email && usuarios.length === 0) {
      throw criarErro(404, "Email não encontrado.");
    }

    res.json(usuarios.map(removerSenha));
  },

  async buscarUsuarioPorId(req, res) {
    const id = Number(req.params.id);
    const usuario = await usuariosModel.buscarUsuarioPorId(id);

    if (!usuario) {
      throw criarErro(404, "Usuário não encontrado!");
    }

    res.json(removerSenha(usuario));
  },

  async criarUsuario(req, res) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      throw criarErro(400, "Nome, email e senha são obrigatórios!");
    }

    const usuarioExistente = await usuariosModel.buscarUsuarioPorEmail(email);
    if (usuarioExistente) {
      throw criarErro(409, "Email já cadastrado, informe outro email!");
    }

    const novoUsuario = await usuariosModel.criarUsuario({ nome, email, senha });

    res.status(201).json({
      mensagem: "Usuário criado com sucesso!",
      usuario: removerSenha(novoUsuario),
    });
  },

  async atualizarUsuario(req, res) {
    const id = Number(req.params.id);

    const usuarioExistente = await usuariosModel.buscarUsuarioPorId(id);
    if (!usuarioExistente) {
      throw criarErro(404, "Usuário não encontrado");
    }

    const usuarioAtualizado = await usuariosModel.atualizarUsuario(id, req.body);

    res.json({
      mensagem: "Usuário atualizado com sucesso",
      usuario: removerSenha(usuarioAtualizado),
    });
  },

  async deletarUsuario(req, res) {
    const id = Number(req.params.id);

    const usuarioExistente = await usuariosModel.buscarUsuarioPorId(id);
    if (!usuarioExistente) {
      throw criarErro(404, "Usuário não encontrado");
    }

    const usuarioRemovido = await usuariosModel.deletarUsuario(id);

    res.json({
      mensagem: "Usuário removido",
      usuario: removerSenha(usuarioRemovido),
    });
  },
};

module.exports = usuariosController;