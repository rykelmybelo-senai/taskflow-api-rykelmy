const pool = require("../database/db");

module.exports = {
  listarUsuarios: async (nome, email) => {
    let query = "SELECT * FROM usuarios";
    const params = [];

    if (nome) {
      query += " WHERE nome = $1";
      params.push(nome);
    }
    if (email) {
      query += " WHERE email = $2";
      params.push(email);
    }

    const resultado = await pool.query(query, params);
    return resultado.rows;
  },
  buscarUsuarioPorEmail: async (email) => {
    const resultado = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email],
    );
    return resultado.rows[0];
  },
  buscarUsuarioPorId: async (id) => {
    const resultado = await pool.query("SELECT * FROM usuarios WHERE id = $1", [
      id,
    ]);
    return resultado.rows[0] || null;
  },
  criarUsuario: async ({ nome, email, senha }) => {
    const resultado = await pool.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, senha],
    );
    return resultado.rows[0] || null;
  },
  atualizarUsuario: async (id, dadosAtualizados) => {
    const { nome, email, senha } = dadosAtualizados;
    const resultado = await pool.query(
      "UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *",
      [nome, email, senha, id],
    );
    return resultado.rows[0] || null;
  },
  deletarUsuario: async (id) => {
    const resultado = await pool.query(
      "DELETE FROM usuarios WHERE id = $1 RETURNING *",
      [id],
    );
    return resultado.rows[0] || null;
  },
};

//Codigo antigo de teste com array de usuarios, substituido por banco de dados Postgres.
// const listaUsuarios = [
//   {
//     id: 4,
//     nome: "Admin",
//     email: "admin@email.com",
//     senha: "1234",
//   },
// ];

// let proximoId = 5;

// module.exports = {
//   listarUsuarios: (nome, email) => {
//     let totalUsuarios = listaUsuarios;

//     if (nome) {
//       totalUsuarios = totalUsuarios.filter((u) => u.nome === nome);
//     }
//     if (email) {
//       totalUsuarios = totalUsuarios.filter((u) => u.email === email);
//     }
//     return totalUsuarios;
//   },

//     buscarUsuarioPorEmail: (email) => listaUsuarios.find((u) => u.email === email),
//     buscarUsuarioPorId: (id) => listaUsuarios.find((u) => u.id === id),
//     criarUsuario: ({ nome, email, senha }) => {
//     const novoUsuario = {
//       id: proximoId++,
//       nome: nome,
//       email: email,
//       senha: senha,
//     };
//     listaUsuarios.push(novoUsuario);
//     return novoUsuario;
//   },

//     atualizarUsuario: (id, dadosAtualizados) => {
//     const usuarioIndex = listaUsuarios.findIndex((u) => u.id === id);
//     if (usuarioIndex === -1) return null;
//     listaUsuarios[usuarioIndex] = { ...listaUsuarios[usuarioIndex], ...dadosAtualizados };
//     return listaUsuarios[usuarioIndex];
//   },

//     deletarUsuario: (id) => {
//     const usuarioIndex = listaUsuarios.findIndex((u) => u.id === id);
//     if (usuarioIndex === -1) return false;
//     const removido = listaUsuarios.splice(usuarioIndex, 1)[0];
//     return (removido);
//   },
// };
