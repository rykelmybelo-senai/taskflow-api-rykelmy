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
  listarTarefas: () => {
    const totalTarefas = listaTarefas;
    return totalTarefas;
  },
  listarPorColuna: (coluna) => listaTarefas.filter((t) => t.coluna === coluna),
  listarPorPrioridade: (prioridade) => listaTarefas.filter((t) => t.prioridade === prioridade),
  listarPorCidade: (cidade) => listaTarefas.filter((t) => t.cidade === cidade),
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
  atualizarTarefa: (id, dadosAtualizados) => {
    const tarefaIndex = listaTarefas.findIndex((t) => t.id === id);
    if (tarefaIndex === -1) return null;

    listaTarefas[tarefaIndex] = { ...listaTarefas[tarefaIndex], ...dadosAtualizados, id };
    return listaTarefas[tarefaIndex];
  },
  deletarTarefa: (id) => {
    const tarefaIndex = listaTarefas.findIndex((t) => t.id === id);
    if (tarefaIndex === -1) return false;

    const tarefaRemovida = listaTarefas.splice(tarefaIndex, 1)[0];
    return tarefaRemovida;
  },
  estatisticasTarefas: () => {
    const totalTarefas = listaTarefas.length;
    const totalPorPrioridade = {
      alta: listaTarefas.filter((t) => t.prioridade === "alta").length,
      media: listaTarefas.filter((t) => t.prioridade === "media").length,
      baixa: listaTarefas.filter((t) => t.prioridade === "baixa").length,
    };
    const porColuna = {
      afazer: listaTarefas.filter((t) => t.coluna === "afazer").length,
      andamento: listaTarefas.filter((t) => t.coluna === "andamento").length,
      concluida: listaTarefas.filter((t) => t.coluna === "concluida").length,
    };
    return { totalTarefas, totalPorPrioridade, porColuna };
  },
};