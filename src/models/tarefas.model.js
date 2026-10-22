const pool = require("../database/db");

module.exports = {
  listarTarefas: async () => {
    //Use entre crase para organizar o código do banco na vertical.
    const resultado = await pool.query(
      `SELECT t.*, p.nome as projeto, u.nome as usuario, pr.descricao as prioridade FROM tarefas t 
      inner join projetos p on t.projeto_id = p.id 
      inner join usuarios u on t.usuario_id = u.id 
      inner join prioridade pr on t.prioridade_id = pr.id
      ORDER BY t.id`,
    ); //Esse terceiro inner join terá que ser implementado no Front End para evitar de chamar uma função no "ListaTarefas".
    return resultado.rows;
  },
  listarPorColuna: async (coluna) => {
    const resultado = await pool.query(
      "SELECT * FROM tarefas t WHERE t.coluna = $1",
      [coluna],
    );
    return resultado.rows;
  },
  listarPorPrioridade: async (prioridade) => {
    const resultado = await pool.query(
      "SELECT * FROM tarefas t WHERE t.prioridade_id = $1",
      [prioridade],
    );
    return resultado.rows;
  },
  buscarPorId: async (id) => {
    const resultado = await pool.query(
      "SELECT * FROM tarefas t WHERE t.id = $1",
      [id],
    );
    return resultado.rows[0];
  },
  criarTarefa: async ({
    texto,
    prioridade_id,
    coluna,
    usuario_id,
    projeto_id,
    cidade,
    ordem,
  }) => {
    const iniciadoEm = coluna === "andamento" ? new Date() : null;
    const concluidaEm = coluna === "concluido" ? new Date() : null;
    const resultado = await pool.query(
      "INSERT INTO tarefas (texto, prioridade_id, coluna, usuario_id, projeto_id, cidade, ordem, iniciado_em, concluida_em) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        texto,
        prioridade_id || 2,
        coluna || "afazer",
        usuario_id,
        projeto_id,
        cidade || null,
        ordem || 0,
        iniciadoEm,
        concluidaEm,
      ],
    );
    return resultado.rows[0];
  },
  atualizarTarefa: async (id, dadosAtualizados) => {
    const tarefaAtual = await pool.query(
      "SELECT * FROM tarefas WHERE id = $1",
      [id],
    );

    if (tarefaAtual.rows.length === 0) {
      return null;
    }

    const concluidaEm =
      dadosAtualizados.coluna === "concluido" ? new Date() : null;

    let iniciadoEm = tarefaAtual.rows[0].iniciado_em;

    if (
      tarefaAtual.rows[0].coluna === "andamento" &&
      dadosAtualizados.coluna === "afazer"
    ) {
      iniciadoEm = null;
    } else if (
      tarefaAtual.rows[0].coluna === "afazer" &&
      dadosAtualizados.coluna === "andamento"
    ) {
      iniciadoEm = new Date();
    } else if (
      tarefaAtual.rows[0].coluna === "concluido" &&
      dadosAtualizados.coluna === "afazer"
    ) {
      iniciadoEm = null;
    } else if (
      tarefaAtual.rows[0].coluna === "concluido" &&
      dadosAtualizados.coluna === "andamento"
    ) {
      iniciadoEm = new Date();
    }

    // const iniciadoEm =
    //   dadosAtualizados.coluna === "andamento" &&
    //   tarefaAtual.rows[0].iniciado_em === null
    //     ? new Date()
    //     : tarefaAtual.rows[0].iniciado_em;

    const resultado = await pool.query(
      "UPDATE tarefas SET texto = $1, prioridade_id = $2, coluna = $3, usuario_id = $4, projeto_id = $5, cidade = $6, concluida_em = $7, iniciado_em = $8 WHERE id = $9 RETURNING *",
      [
        dadosAtualizados.texto,
        dadosAtualizados.prioridade_id,
        dadosAtualizados.coluna,
        dadosAtualizados.usuario_id,
        dadosAtualizados.projeto_id,
        dadosAtualizados.cidade,
        concluidaEm,
        iniciadoEm,
        id,
      ],
    );
    return resultado.rows[0] || null;
  },
  deletarTarefa: async (id) => {
    const resultado = await pool.query(
      "DELETE FROM tarefas WHERE id = $1 RETURNING *",
      [id],
    );
    return resultado.rows[0];
  },
  estatisticasTarefas: async () => {
    const totalTarefasResult = await pool.query("SELECT COUNT(*) FROM tarefas");
    const totalTarefas = parseInt(totalTarefasResult.rows[0].count, 10);
    const totalPorPrioridadeResult = await pool.query(
      "SELECT t.prioridade_id, COUNT(*) as count FROM tarefas t group by t.prioridade_id order by t.prioridade_id",
    );
    const totalPorPrioridade = totalPorPrioridadeResult.rows.reduce(
      (acc, row) => {
        acc[row.prioridade_id] = parseInt(row.count, 10);
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
