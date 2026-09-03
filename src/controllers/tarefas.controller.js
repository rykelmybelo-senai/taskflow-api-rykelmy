let listaTarefas = [
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
    prioridade: "media",
    coluna: "andamento",
    cidade: "Natal/RN",
  },
  {
    id: 3,
    texto: "Testar Postman",
    prioridade: "baixa",
    coluna: "concluida",
    cidade: "Natal/RN",
  },
];

let proximoId = 4;

const tarefasController = {
  listarTarefas: (req, res) => {
    const { coluna, prioridade } = req.query;
    let resultado = listaTarefas;
    const notColuna = listaTarefas.findIndex((t) => t.coluna === coluna);
    const notPrioridade = listaTarefas.findIndex((t) => t.prioridade === prioridade);
    //     const porColuna = {
    //   afazer: base.filter((t) => t.coluna === "afazer").length,
    //   andamento: base.filter((t) => t.coluna === "andamento").length,
    //   concluida: base.filter((t) => t.coluna === "concluida").length,
    // };
    if (notColuna === -1 && coluna) {
      return res.status(404).json({ message: "Coluna não encontrada, procure por afazer, andamento ou concluida." }); 
    }
    if (notPrioridade === -1 && prioridade) {
      return res.status(404).json({ message: "Prioridade não encontrada, procure por alta, media ou baixa." }); 
    }
    if (coluna || prioridade) {
      resultado = listaTarefas.filter((t) => t.coluna === coluna || t.prioridade === prioridade);
    }
    // if (prioridade) {
    //   resultado = resultado.filter((t) => t.prioridade === prioridade);
    // }
    if (!coluna && !prioridade && Object.keys(req.query).length > 0) {
      return res.status(400).json({ message: "Filtro inválido, busque por uma coluna ou prioridade válida." });
    }
    res.json(resultado);
  },

  buscarPorId: (req, res) => {
    const id = parseInt(req.params.id);
    const tarefa = listaTarefas.find((t) => t.id === id);

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
    listaTarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
  },

  atualizarTarefa: (req, res) => {
    const id = parseInt(req.params.id); //parserInt converte a string para número inteiro, ignorando qualquer caractere não numérico. Exemplo: parseInt("123abc") retorna 123, enquanto parseInt("abc") retorna NaN (Not a Number).
    const idx = listaTarefas.findIndex((t) => t.id === id);

    if (idx === -1)
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    listaTarefas[idx] = { ...listaTarefas[idx], ...req.body, id };
    res.json(listaTarefas[idx]);
  },

  deletarTarefa: (req, res) => {
    const id = parseInt(req.params.id);
    const idx = listaTarefas.findIndex((t) => t.id === id);

    if (idx === -1)
      return res.status(404).json({ erro: "Tarefa não encontrada" });

    const removida = listaTarefas.splice(idx, 1)[0];

    res.json({ mensagem: "Tarefa removida", tarefa: removida });
  },

  estatisticasTarefas: (req, res) => {
    const { coluna } = req.query;
    const base = coluna ? listaTarefas.filter((t) => t.coluna === coluna) : listaTarefas;
    const porColuna = {
      afazer: base.filter((t) => t.coluna === "afazer").length,
      andamento: base.filter((t) => t.coluna === "andamento").length,
      concluida: base.filter((t) => t.coluna === "concluida").length,
    };

    res.json({ total: base.length, porColuna });
  },
};

module.exports = tarefasController;
