const projetosModel = require("../models/projetos.model");
const criarErro = require("../utils/criarErro");

const projetosController = {
  async listarProjetos(req, res) {
    const { nome } = req.query;
    const projetos = await projetosModel.listarProjetos(nome);

    if (nome && projetos.length === 0) {
      throw criarErro(404, "Nenhum projeto encontrado com esse nome.");
    }

    res.json(projetos);
  },

  async buscarProjetoPorId(req, res) {
    const id = Number(req.params.id);
    const projeto = await projetosModel.buscarProjetoPorId(id);

    if (!projeto) {
      throw criarErro(404, "Projeto não encontrado");
    }

    res.json(projeto);
  },

  async criarProjeto(req, res) {
    const { nome, descricao } = req.body;
    // usuario_id vem do token JWT de autenticação (req.usuario) ou do body
    const usuario_id = req.usuario?.id || req.body.usuario_id;

    if (!usuario_id) {
      throw criarErro(400, "O usuário proprietário (usuario_id) é obrigatório.");
    }

    const novoProjeto = await projetosModel.criarProjeto({
      nome,
      descricao,
      usuario_id: Number(usuario_id),
    });

    res.status(201).json(novoProjeto);
  },

  async atualizarProjeto(req, res) {
    const id = Number(req.params.id);
    const { nome, descricao, usuario_id } = req.body;

    const projetoExistente = await projetosModel.buscarProjetoPorId(id);
    if (!projetoExistente) {
      throw criarErro(404, "Projeto não encontrado");
    }

    const projetoAtualizado = await projetosModel.atualizarProjeto(id, {
      nome,
      descricao,
      usuario_id: usuario_id ? Number(usuario_id) : undefined,
    });

    res.json(projetoAtualizado);
  },

  async deletarProjeto(req, res) {
    const id = Number(req.params.id);

    const projetoExistente = await projetosModel.buscarProjetoPorId(id);
    if (!projetoExistente) {
      throw criarErro(404, "Projeto não encontrado");
    }

    await projetosModel.deletarProjeto(id);
    res.status(204).send();
  },
};

module.exports = projetosController;