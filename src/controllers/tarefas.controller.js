const tarefasModel = require("../models/tarefas.model");

const tarefasController = {
  listarTarefas (req, res) {
    const { coluna, prioridade } = req.query;
    let resultado = tarefasModel.listarTarefas();
    res.json(resultado);
  },

  listarPorColuna: (req, res) => {
    const { coluna } = req.params;
    const tarefas = tarefasModel.listarPorColuna(coluna);

    if (!coluna || !["afazer", "andamento", "concluida"].includes(coluna)) {
      return res.status(400).json({ message: "Coluna inválida. Use 'afazer', 'andamento' ou 'concluida'." });
    }
    res.json(tarefas);
  },

  listarPorPrioridade: (req, res) => {
    const { prioridade } = req.params;
    const tarefas = tarefasModel.listarPorPrioridade(prioridade);

    if (!prioridade || !["alta", "media", "baixa"].includes(prioridade)) {
      return res.status(400).json({ message: "Prioridade inválida. Use 'alta', 'media' ou 'baixa'." });
    }
    res.json(tarefas);
  },

  listarPorCidade: (req, res) => {
    const { cidade } = req.params;
    const tarefas = tarefasModel.listarPorCidade(cidade);

    if (!tarefas) return res.status(400).json([]);
    res.json(tarefas);
  },

  buscarPorId: (req, res) => {
    const tarefa = tarefasModel.buscarPorId(parseInt(req.params.id));

    if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });
    res.json(tarefa);
  },

  criarTarefa: (req, res) => {
    const { texto } = req.body;

    if (!texto) return res.status(400).json({ erro: "Texto obrigatório" });
    res.status(201).json(tarefasModel.criarTarefa(req.body));
  },

  atualizarTarefa: (req, res) => {
    const atualizada = tarefasModel.atualizarTarefa(parseInt(req.params.id), req.body);

    if (!atualizada) return res.status(404).json({ erro: "Tarefa não encontrada" });
    res.json(atualizada);
  },

  deletarTarefa: (req, res) => {
    const removida = tarefasModel.deletarTarefa(parseInt(req.params.id));

    if (!removida) return res.status(404).json({ erro: "Tarefa não encontrada" });
    res.json({ mensagem: "Tarefa removida", tarefa: removida });
  },

  estatisticasTarefas: (req, res) => {
    const estatisticas = tarefasModel.estatisticasTarefas();
    res.json(estatisticas);
  }
};

module.exports = tarefasController;
