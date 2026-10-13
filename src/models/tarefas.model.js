const pool = require("../database/db");

module.exports = {
  listarTarefas: async () => {
    const resultado = await pool.query("SELECT * FROM tarefas ORDER BY id");
    return resultado.rows;
  },
  listarPorColuna: async (coluna) => {
    const resultado = await pool.query(
      "SELECT * FROM tarefas WHERE coluna = $1",
      [coluna],
    );
    return resultado.rows;
  },
  listarPorPrioridade: async (prioridade) => {
    const resultado = await pool.query(
      "SELECT * FROM tarefas WHERE prioridade = $1",
      [prioridade],
    );
    return resultado.rows;
  },
  listarPorCidade: async (cidade) => {
    const resultado = await pool.query(
      "SELECT * FROM tarefas WHERE cidade = $1",
      [cidade],
    );
    return resultado.rows;
  },
  buscarPorId: async (id) => {
    const resultado = await pool.query("SELECT * FROM tarefas WHERE id = $1", [
      id,
    ]);
    return resultado.rows[0] || null;
  },
  criarTarefa: async ({
    texto,
    prioridade,
    coluna,
    usuario_id,
    projeto_id,
    cidade,
  }) => {
    const resultado = await pool.query(
      "INSERT INTO tarefas (texto, prioridade, coluna, usuario_id, projeto_id, cidade) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [texto, prioridade || "media", coluna || "afazer", usuario_id || null, projeto_id || null, cidade || null],
    );
    return resultado.rows[0] || null;
  },
  atualizarTarefa: async (id, dadosAtualizados) => {
    const { texto, prioridade, coluna, usuario_id, projeto_id, cidade } =
      dadosAtualizados;
    const resultado = await pool.query(
      "UPDATE tarefas SET texto = $1, prioridade = $2, coluna = $3, usuario_id = $4, projeto_id = $5, cidade = $6 WHERE id = $7 RETURNING *",
      [texto, prioridade || "media", coluna || "afazer", usuario_id || null, projeto_id || null, cidade, id],
    );
    return resultado.rows[0] || null;
  },
  deletarTarefa: async (id) => {
    const resultado = await pool.query(
      "DELETE FROM tarefas WHERE id = $1 RETURNING *",
      [id],
    );
    return resultado.rows[0] || null;
  },
  estatisticasTarefas: async () => {
    const totalTarefasResult = await pool.query("SELECT COUNT(*) FROM tarefas");
    const totalTarefas = parseInt(totalTarefasResult.rows[0].count, 10);
    const totalPorPrioridadeResult = await pool.query(
      "SELECT prioridade, COUNT(*) as count FROM tarefas GROUP BY prioridade",
    );
    const totalPorPrioridade = totalPorPrioridadeResult.rows.reduce(
      (acc, row) => {
        acc[row.prioridade] = parseInt(row.count, 10);
        return acc;
      },
      {},
    );
    const porColunaResult = await pool.query(
      "SELECT coluna, COUNT(*) as count FROM tarefas GROUP BY coluna",
    );
    const porColuna = porColunaResult.rows.reduce((acc, row) => {
      acc[row.coluna] = parseInt(row.count, 10);
      return acc;
    }, {});
    return { totalTarefas, totalPorPrioridade, porColuna };
  },
};

//Codigo antigo de tarefas em memória, substituído por banco de dados Postgres.
// const listaTarefas = [
//   {
//     coluna: "afazer",
//     cidade: "Natal-RN",
//   },
//   {
//     id: 2,
//     texto: "Criar API",
//     prioridade: "media",
//     coluna: "andamento",
//     cidade: "Natal-RN",
//   },
//   {
//     id: 3,
//     texto: "Testar Postman",
//     prioridade: "baixa",
//     coluna: "concluido",
//     cidade: "Natal-RN",
//   },
// ];

// let proximoId = 4;

// module.exports = {
//   listarTarefas: () => {
//     const totalTarefas = listaTarefas;
//     return totalTarefas;
//   },
//   listarPorColuna: (coluna) => {
//     const totalPorColuna = listaTarefas.filter((t) => t.coluna === coluna);
//     return totalPorColuna;
//   },
//   listarPorPrioridade: (prioridade) => {
//     const totalPorPrioridade = listaTarefas.filter((t) => t.prioridade === prioridade);
//     return totalPorPrioridade;
//   },
//   listarPorCidade: (cidade) => {
//     const totalPorCidade = listaTarefas.filter((t) => t.cidade === cidade);
//     return totalPorCidade;
//   },
//   buscarPorId: (id) => {
//     const totalPorId = listaTarefas.find((t) => t.id === id);
//     return totalPorId;
//   },
//   criarTarefa: ({ texto, prioridade, coluna, cidade }) => {
//     const novaTarefa = {
//       id: proximoId++,
//       texto: texto,
//       prioridade: prioridade || "media",
//       coluna: coluna || "afazer",
//       cidade: cidade || "",
//     };
//     listaTarefas.push(novaTarefa);
//     return novaTarefa;
//   },
//   atualizarTarefa: (id, dadosAtualizados) => {
//     const tarefaIndex = listaTarefas.findIndex((t) => t.id === id);
//     if (tarefaIndex === -1) return null;

//     listaTarefas[tarefaIndex] = { ...listaTarefas[tarefaIndex], ...dadosAtualizados, id };
//     return listaTarefas[tarefaIndex];
//   },
//   deletarTarefa: (id) => {
//     const tarefaIndex = listaTarefas.findIndex((t) => t.id === id);
//     if (tarefaIndex === -1) return false;

//     const tarefaRemovida = listaTarefas.splice(tarefaIndex, 1)[0];
//     return tarefaRemovida;
//   },
//   estatisticasTarefas: () => {
//     const totalTarefas = listaTarefas.length;
//     const totalPorPrioridade = {
//       alta: listaTarefas.filter((t) => t.prioridade === "alta").length,
//       media: listaTarefas.filter((t) => t.prioridade === "media").length,
//       baixa: listaTarefas.filter((t) => t.prioridade === "baixa").length,
//     };
//     const porColuna = {
//       afazer: listaTarefas.filter((t) => t.coluna === "afazer").length,
//       andamento: listaTarefas.filter((t) => t.coluna === "andamento").length,
//       concluida: listaTarefas.filter((t) => t.coluna === "concluida").length,
//     };
//     return { totalTarefas, totalPorPrioridade, porColuna };
//   },
// };
