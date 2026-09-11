const usuariosModel = require("../models/usuarios.model");

const usuariosController = {
  listarUsuarios: (req, res) => {
    const { nome, email } = req.query;
    // Começar com todas os usuarios
    let resultadoUser = usuariosModel.listarUsuarios(nome, email);

    if (resultadoUser.length === 0 && nome) {
      return res.status(404).json({ message: "Nome não encontrado." });
    }
    if (resultadoUser.length === 0 && email) {
      return res.status(404).json({ message: "Email não encontrado." });
    }
    if (!nome && !email && resultadoUser.length === 0) {
      return res
        .status(400)
        .json({
          message: "Filtro inválido, busque por um nome ou email válido.",
        });
    }

    res.json(resultadoUser);
  },

  buscarUsuarioPorId: (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuariosModel.buscarUsuarioPorId(id);
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado!" });
    }
    res.json(usuario);
  },

  criarUsuario: (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha)
      return res
        .status(400)
        .json({ erro: "Nome, email e senha são obrigatórios!" });

    if (usuariosModel.buscarUsuarioPorEmail(email))
      return res
        .status(400)
        .json({ erro: "Email já cadastrado, informe outro email!" });
    res
      .status(201)
      .json({
        mensagem: "Usuário criado com sucesso!",
        usuario: usuariosModel.criarUsuario({ nome, email, senha }),
      });
  },

  atualizarUsuario: (req, res) => {
    const id = parseInt(req.params.id);

    // Se não encontrou — retornar 404
    if (usuariosModel.buscarUsuarioPorId(id) === undefined) {
      return res.status(404).json({ erro: "Usuario não encontrado" });
    }
    // Retornar o usuario atualizado com status 200
    res.json({
      mensagem: "Usuario atualizado com sucesso",
      usuario: usuariosModel.atualizarUsuario(id, req.body),
    });
  },

  deletarUsuario: (req, res) => {
    const usuarioRemovido = usuariosModel.deletarUsuario(
      parseInt(req.params.id),
    );

    if (!usuarioRemovido)
      return res.status(404).json({ erro: "Usuario não encontrado" });
    res.json({ mensagem: "Usuario removido", usuario: usuarioRemovido });
  },
};

module.exports = usuariosController;
