let tarefas = [
  {
    id: 1,
    texto: "Estudar Node",
    prioridade: "alta",
    coluna: "afazer",
    cidade: "Natal/RN",
  },
  {
    id: 2,
    texto: "Criar API",
    prioridade: "alta",
    coluna: "andamento",
    cidade: "Natal/RN",
  },
  {
    id: 3,
    texto: "Testar Postman",
    prioridade: "media",
    coluna: "concluida",
    cidade: "Natal/RN",
  },
];

let proximoId = 4;

const tarefasController = {
  listarTarefas: (req, res) => {
    const { coluna } = req.query;
    let resultado = tarefas;

    if (coluna) resultado = tarefas.filter((t) => t.coluna === coluna);
    res.json(resultado);
  },

  buscarPorId: (req, res) => {
    const id = parseInt(req.params.id);
    const tarefa = tarefas.find((t) => t.id === id);

    if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });
    res.json(tarefa);
  },

  criarTarefa: (req, res) => {
    const { texto, prioridade, coluna, cidade } = req.body;

    if (!texto) return res.status(400).json({ erro: "Texto obrigatório" });

    const novaTarefa = {
      id: proximoId++,
      texto: texto,
      prioridade: prioridade || "media",
      coluna: coluna || "afazer",
      cidade: cidade || "",
    };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
  },

  atualizarTarefa: (req, res) => {
    const id = parseInt(req.params.id); //parserInt converte a string para número inteiro, ignorando qualquer caractere não numérico. Exemplo: parseInt("123abc") retorna 123, enquanto parseInt("abc") retorna NaN (Not a Number).
    const idx = tarefas.findIndex((t) => t.id === id);

    if (idx === -1)
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    tarefas[idx] = { ...tarefas[idx], ...req.body, id };
    res.json(tarefas[idx]);
  },

  deletarTarefa: (req, res) => {
    const id = parseInt(req.params.id);
    const idx = tarefas.findIndex((t) => t.id === id);

    if (idx === -1)
      return res.status(404).json({ erro: "Tarefa não encontrada" });

    const removida = tarefas.splice(idx, 1)[0];

    res.json({ mensagem: "Tarefa removida", tarefa: removida });
  },

  estatisticasTarefas: (req, res) => {
    const { coluna } = req.query;
    const base = coluna ? tarefas.filter((t) => t.coluna === coluna) : tarefas;
    const porColuna = {
      afazer: base.filter((t) => t.coluna === "afazer").length,
      andamento: base.filter((t) => t.coluna === "andamento").length,
      concluida: base.filter((t) => t.coluna === "concluida").length,
    };

    res.json({ total: base.length, porColuna });
  },
};

module.exports = tarefasController;
