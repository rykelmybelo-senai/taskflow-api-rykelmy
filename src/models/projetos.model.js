const pool = require("../database/db");

module.exports = {
  listarProjetos: async (nome, status) => {
    let query = "SELECT * FROM projetos";
    const params = [];

    if (nome) {
      params.push(nome);
      query += ` WHERE nome = $${params.length}`;
    }
    if (status) {
      params.push(status);
      query +=
        params.length > 1
          ? ` AND status = $${params.length}`
          : ` WHERE status = $${params.length}`;
    }

    const resultado = await pool.query(query, params);
    return resultado.rows;
  },
  buscarProjetoPorId: async (id) => {
    const resultado = await pool.query("SELECT * FROM projetos WHERE id = $1", [
      id,
    ]);
    return resultado.rows[0];
  },
  criarProjeto: async ({ nome, descricao, status }) => {
    const resultado = await pool.query(
      "INSERT INTO projetos (nome, descricao, status) VALUES ($1, $2, $3) RETURNING *",
      [nome, descricao, status || "ativo"],
    );
    return resultado.rows[0];
  },
  atualizarProjeto: async (id, { nome, descricao, status }) => {
    const resultado = await pool.query(
      "UPDATE projetos SET nome = $1, descricao = $2, status = $3 WHERE id = $4 RETURNING *",
      [nome, descricao, status, id],
    );
    return resultado.rows[0];
  },
  deletarProjeto: async (id) => {
    const resultado = await pool.query(
      "DELETE FROM projetos WHERE id = $1 RETURNING *",
      [id],
    );
    return resultado.rows[0];
  },
};

//Codigo antigo de teste com array de projetos, substituido por banco de dados Postgres.
// let listaProjetos = [
//     {
//         id: 1,
//         nome: "Projeto 1",
//         descricao: "Descrição do Projeto 1",
//         status: "ativo",
//     },
//     {
//         id: 2,
//         nome: "Projeto 2",
//         descricao: "Descrição do Projeto 2",
//         status: "ativo",
//     },
//     {
//         id: 3,
//         nome: "Projeto 3",
//         descricao: "Descrição do Projeto 3",
//         status: "inativo",
//     }
// ];

// let proximoIdProjeto = 4;

// module.exports = {
//     listarProjetos: (nome, status) => {
//         let resultado = listaProjetos;

//         if (nome) {
//             resultado = listaProjetos.filter((p) => p.nome === nome);
//         }
//         if (status) {
//             resultado = listaProjetos.filter((p) => p.status === status);
//         }
//         return resultado;
//     },

//     buscarProjetoPorId: (id) => listaProjetos.find((p) => p.id === id),

//     criarProjeto: ({ nome, descricao, status }) => {

//         const novoProjeto = {
//             id: proximoIdProjeto++,
//             nome: nome,
//             descricao: descricao || "Informe uma descrição para o projeto.",
//             status: status || "ativo",
//         };
//         listaProjetos.push(novoProjeto);
//         return novoProjeto;
//     },

//     atualizarProjeto: ({ id, nome, descricao, status }) => {
//         const idx = listaProjetos.findIndex((p) => p.id === id);

//         if (idx === -1) return null;

//         listaProjetos[idx] = { ...listaProjetos[idx], nome: nome ?? listaProjetos[idx].nome, descricao: descricao ?? listaProjetos[idx].descricao, status: status ?? listaProjetos[idx].status };
//         return listaProjetos[idx];
//     },

//     deletarProjeto: (id) => {
//         const idx = listaProjetos.findIndex((p) => p.id === id);
//         if (idx === -1) {
//             return null;
//         }
//         const removido = listaProjetos.splice(idx, 1)[0];
//         return ({ mensagem: "Projeto removido com sucesso.", projeto: removido });
//     },
// };
