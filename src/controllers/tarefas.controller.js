const tarefasModel = require("../models/tarefas.model");
const criarErro = require("../utils/criarErro");

const tarefasController = {
  async listarTarefas(req, res) {
    const tarefas = await tarefasModel.listarTarefas();
    res.json(tarefas);
  },

  async listarPorColuna(req, res) {
    const { coluna } = req.params;
    const colunasValidas = ["afazer", "andamento", "concluido"];

    // Validação DEVE ocorrer ANTES de consultar o banco de dados
    if (!coluna || !colunasValidas.includes(coluna)) {
      throw criarErro(
        400,
        "Coluna inválida. Use 'afazer', 'andamento' ou 'concluido'.",
      );
    }

    const tarefas = await tarefasModel.listarPorColuna(coluna);
    res.json(tarefas);
  },

  async listarPorPrioridade(req, res) {
    const { prioridade } = req.params;
    const prioridadesValidas = ["1", "2", "3"];

    // Validação corrigida e movida para antes da consulta
    if (!prioridadesValidas.includes(prioridade)) {
      throw criarErro(400, "Prioridade inválida. Use '1', '2' ou '3'.");
    }

    const tarefas = await tarefasModel.listarPorPrioridade(Number(prioridade));
    res.json(tarefas);
  },

  async buscarPorId(req, res) {
    const id = Number(req.params.id);
    const tarefa = await tarefasModel.buscarPorId(id);

    if (!tarefa) {
      throw criarErro(404, "Tarefa não encontrada");
    }

    res.json(tarefa);
  },

  async criarTarefa(req, res) {
    const { texto, prioridade_id, coluna, usuario_id, projeto_id, cidade, ordem } =
      req.body;

    // Regra de negócio: impede criação se já houver tarefa em andamento
    if (
      coluna === "andamento" &&
      (await tarefasModel.listarPorColuna("andamento")).length > 0
    ) {
      throw criarErro(
        400,
        "Não é permitido criar tarefas diretamente na coluna 'andamento' quando já existe uma em andamento.",
      );
    }

    const novaTarefa = await tarefasModel.criarTarefa({
      texto,
      prioridade_id,
      coluna,
      usuario_id: req.usuario?.id || usuario_id, // Utiliza o ID autenticado se disponível
      projeto_id,
      cidade,
      ordem,
    });

    res.status(201).json(novaTarefa);
  },

  async atualizarTarefa(req, res) {
    const id = Number(req.params.id);

    const atualizada = await tarefasModel.atualizarTarefa(id, req.body);

    if (!atualizada) {
      throw criarErro(404, "Tarefa não encontrada");
    }

    res.json(atualizada);
  },

  async deletarTarefa(req, res) {
    const id = Number(req.params.id);

    const removida = await tarefasModel.deletarTarefa(id);

    if (!removida) {
      throw criarErro(404, "Tarefa não encontrada");
    }

    res.json({ mensagem: "Tarefa removida", tarefa: removida });
  },

  async estatisticasTarefas(req, res) {
    const estatisticas = await tarefasModel.estatisticasTarefas();
    res.json(estatisticas);
  },
};

module.exports = tarefasController;