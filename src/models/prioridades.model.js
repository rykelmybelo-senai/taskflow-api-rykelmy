const pool = require("../database/db");

module.exports = {
  listarPrioridades: async () => {
    const resultado = await pool.query("SELECT * FROM prioridade ORDER BY id");
    return resultado.rows;
  },
  buscarPorId: async (id) => {
    const resultado = await pool.query("SELECT * FROM prioridade WHERE id = $1", [id]);
    return resultado.rows[0];
  },
  criarPrioridade: async ({ descricao, ativo }) => {
    const resultado = await pool.query("INSERT INTO prioridade (descricao, ativo) VALUES ($1, $2) RETURNING *", [descricao, ativo || true]);
    return resultado.rows[0];
  },
  atualizarPrioridade: async (id, { descricao, ativo }) => {
    const resultado = await pool.query("UPDATE prioridade SET descricao = $1, ativo = $2 WHERE id = $3 RETURNING *", [descricao, ativo, id]);
    return resultado.rows[0];
  },
  deletarPrioridade: async (id) => {
    await pool.query("DELETE FROM prioridade WHERE id = $1", [id]);
  },
};