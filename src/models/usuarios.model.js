const prisma = require("../database/prisma");

module.exports = {
  listarUsuarios: async (nome, email) => {
    const where = {};

    if (nome) where.nome = nome;
    if (email) where.email = email;

    return prisma.usuarios.findMany({
      where,
      orderBy: { id: "asc" },
    });
  },

  buscarUsuarioPorEmail: async (email) => {
    return prisma.usuarios.findUnique({
      where: { email },
    });
  },

  buscarUsuarioPorId: async (id) => {
    return prisma.usuarios.findUnique({
      where: { id: Number(id) },
    });
  },

  criarUsuario: async ({ nome, email, senha, senha_hash }) => {
    return prisma.usuarios.create({
      data: {
        nome,
        email,
        senha_hash: senha_hash || senha,
      },
    });
  },

  atualizarUsuario: async (id, dadosAtualizados) => {
    const { nome, email, senha, senha_hash } = dadosAtualizados;
    const data = {};

    if (nome !== undefined) data.nome = nome;
    if (email !== undefined) data.email = email;
    if (senha || senha_hash) data.senha_hash = senha_hash || senha;

    return prisma.usuarios.update({
      where: { id: Number(id) },
      data,
    });
  },

  deletarUsuario: async (id) => {
    return prisma.usuarios.delete({
      where: { id: Number(id) },
    });
  },
};