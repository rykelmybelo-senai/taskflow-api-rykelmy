const tarefasModel = require("../models/tarefas.model");

const tarefasController = {
  async listarTarefas (req, res) {
    let resultado = await tarefasModel.listarTarefas();
    res.json(resultado);
    console.log("Resultado de listarTarefas:", resultado);
  },

  async listarPorColuna (req, res) {
    const { coluna } = req.params;
    const tarefas = await tarefasModel.listarPorColuna(coluna);

    if (!coluna || !["afazer", "andamento", "concluido"].includes(coluna)) {
      return res.status(400).json({ message: "Coluna inválida. Use 'afazer', 'andamento' ou 'concluida'." });
    }
    res.json(tarefas);
  },

  async listarPorPrioridade (req, res) {
    const { prioridade } = req.params;
    const tarefas = await tarefasModel.listarPorPrioridade(prioridade);

    if (!prioridade || !["alta", "media", "baixa"].includes(prioridade)) {
      return res.status(400).json({ message: "Prioridade inválida. Use 'alta', 'media' ou 'baixa'." });
    }
    res.json(tarefas);
  },

  async listarPorCidade (req, res) {
    const { cidade } = req.params;
    const tarefas = await tarefasModel.listarPorCidade(cidade);

    if (!tarefas) return res.status(400).json([]);
    res.json(tarefas);
  },

  async buscarPorId (req, res) {
    const tarefa = await tarefasModel.buscarPorId(parseInt(req.params.id));

    if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });
    res.json(tarefa);
  },

  async criarTarefa (req, res) {
    const { texto } = req.body;

    if (!texto) return res.status(400).json({ erro: "Texto obrigatório" });
    const novaTarefa = await tarefasModel.criarTarefa(req.body);
    res.status(201).json(novaTarefa);
  },

  async atualizarTarefa (req, res) {
    const atualizada = await tarefasModel.atualizarTarefa(parseInt(req.params.id), req.body);

    if (!atualizada) return res.status(404).json({ erro: "Tarefa não encontrada" });
    res.json(atualizada);
  },

  async deletarTarefa (req, res)  {
    const removida = await tarefasModel.deletarTarefa(parseInt(req.params.id));

    if (!removida) return res.status(404).json({ erro: "Tarefa não encontrada" });
    res.json({ mensagem: "Tarefa removida", tarefa: removida });
  },

  async estatisticasTarefas (req, res) {
    const estatisticas = await tarefasModel.estatisticasTarefas();
    res.json(estatisticas);
  }
};

module.exports = tarefasController;
