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

module.exports = {
  listarTarefas: () => listaTarefas,
  buscarPorId: (id) => listaTarefas.find((t) => t.id === id),
  criarTarefa: ({ texto, prioridade, coluna, cidade }) => {
    const novaTarefa = {
      id: proximoId++,
      texto: texto,
      prioridade: prioridade || "media",
      coluna: coluna || "afazer",
      cidade: cidade || "",
    };
    listaTarefas.push(novaTarefa);
    return novaTarefa;
  },
  atualizarTarefa: (id) => {
    const tarefaIndex = listaTarefas.findIndex((t) => t.id === id);
    if (tarefaIndex === -1) return null;

    listaTarefas[tarefaIndex] = { ...listaTarefas[tarefaIndex], ...dadosAtualizados };
    return listaTarefas[tarefaIndex];
  },
  deletarTarefa: (id) => {
    const tarefaIndex = listaTarefas.findIndex((t) => t.id === id);
    if (tarefaIndex === -1) return false;

    listaTarefas.splice(tarefaIndex, 1);
    return true;
  },
  estatisticasTarefas: () => {
    const estatisticas = {
      afazer: listaTarefas.filter((t) => t.coluna === "afazer").length,
        andamento: listaTarefas.filter((t) => t.coluna === "andamento").length,
        concluida: listaTarefas.filter((t) => t.coluna === "concluida").length,
    };
    return estatisticas;
  },
};