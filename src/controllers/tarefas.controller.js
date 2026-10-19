const tarefasModel = require("../models/tarefas.model");
const criarErro = require("../utils/criarErro");

const tarefasController = {
  async listarTarefas(req, res) {
    let resultado = await tarefasModel.listarTarefas();
    res.json(resultado);
    console.log("Resultado de listarTarefas:", resultado);
  },

  async listarPorColuna(req, res) {
    const { coluna } = req.params;
    const tarefas = await tarefasModel.listarPorColuna(coluna);

    if (!coluna || !["afazer", "andamento", "concluido"].includes(coluna)) {
      throw criarErro(400, "Coluna inválida. Use 'afazer', 'andamento' ou 'concluida'.");
    }
    res.json(tarefas);
  },

  async listarPorPrioridade(req, res) {
    const { prioridade_id } = req.params;
    const tarefas = await tarefasModel.listarPorPrioridade(prioridade_id);

    if (!prioridade_id.includes(prioridade_id)) {
      throw criarErro(400, "Prioridade inválida. Use '1', '2' ou '3'.");
    }
    res.json(tarefas);
  },

  async listarPorCidade(req, res) {
    const { cidade } = req.params;
    const tarefas = await tarefasModel.listarPorCidade(cidade);

    if (!tarefas) throw criarErro(400, "Nenhuma tarefa encontrada para a cidade especificada");
    res.json(tarefas);
  },

  async buscarPorId(req, res) {
    const tarefa = await tarefasModel.buscarPorId(parseInt(req.params.id));

    if (!tarefa) {
      throw criarErro(404, "Tarefa não encontrada");
    }
    res.json(tarefa);
  },

  async criarTarefa(req, res) {
    const { texto, prioridade_id, coluna, usuario_id, projeto_id, cidade } =
      req.body;

    // if (!texto) return res.status(400).json({ erro: "Texto obrigatório" });
    // if (!coluna.includes(coluna)) {
    //   return res.status(400).json({ erro: "Coluna inválida. Use 'afazer', 'andamento' ou 'concluido'." });
    // };
    // if (usuario_id) {
    //   if (!projeto_id) {
    //     return res.status(400).json({ erro: "Projeto obrigatório quando usuário está definido" });
    //   }
    // }
    if (
      coluna === "andamento" &&
      (await tarefasModel.listarPorColuna("andamento").length) > 0
    ) {
      throw criarErro(400, "Não é permitido criar tarefas diretamente na coluna 'andamento'");
    }
    res.status(201).json(await tarefasModel.criarTarefa(req.body));
  },

  async atualizarTarefa(req, res) {
    const atualizada = await tarefasModel.atualizarTarefa(
      parseInt(req.params.id),
      req.body,
    );

    if (!atualizada)
      throw criarErro(404, "Tarefa não encontrada");
    res.json(atualizada);
  },

  async deletarTarefa(req, res) {
    const removida = await tarefasModel.deletarTarefa(parseInt(req.params.id));

    if (!removida)
      throw criarErro(404, "Tarefa não encontrada");
    res.json({ mensagem: "Tarefa removida", tarefa: removida });
  },

  async estatisticasTarefas(req, res) {
    const estatisticas = await tarefasModel.estatisticasTarefas();
    res.json(estatisticas);
  },
};

module.exports = tarefasController;
