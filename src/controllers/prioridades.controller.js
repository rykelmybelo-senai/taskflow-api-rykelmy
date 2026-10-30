const prioridadesModel = require("../models/prioridades.model");
const criarErro = require("../utils/criarErro");

const prioridadesController = {
  async listarPrioridades(req, res) {
    const prioridades = await prioridadesModel.listarPrioridades();
    res.json(prioridades);
  },

  async buscarPorId(req, res) {
    const { id } = req.params;
    const prioridade = await prioridadesModel.buscarPorId(id);

    if (!prioridade) {
      throw criarErro(404, "Prioridade não encontrada");
    }
    res.json(prioridade);
  },

  async criarPrioridade(req, res) {
    const { descricao, ativo } = req.body;

    const novaPrioridade = await prioridadesModel.criarPrioridade({
      descricao,
      ativo,
    });
    res.status(201).json(novaPrioridade);
  },

  async atualizarPrioridade(req, res) {
    const { id } = req.params;
    const { descricao, ativo } = req.body;

    const prioridadeExistente = await prioridadesModel.buscarPorId(id);
    if (!prioridadeExistente) {
      throw criarErro(404, "Prioridade não encontrada");
    }

    const prioridadeAtualizada = await prioridadesModel.atualizarPrioridade(id, {
      descricao,
      ativo,
    });
    res.json(prioridadeAtualizada);
  },

  async deletarPrioridade(req, res) {
    const { id } = req.params;
    const prioridadeExistente = await prioridadesModel.buscarPorId(id);
    if (!prioridadeExistente) {
      throw criarErro(404, "Prioridade não encontrada");
    }

    await prioridadesModel.deletarPrioridade(id);
    res.status(204).send();
  },
};

module.exports = prioridadesController;