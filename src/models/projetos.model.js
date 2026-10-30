const prisma = require("../database/prisma");

module.exports = {
  listarProjetos: async (nome) => {
    const where = {};

    if (nome) {
      where.nome = nome;
    }

    return prisma.projetos.findMany({
      where,
      orderBy: { id: "asc" },
    });
  },

  buscarProjetoPorId: async (id) => {
    return prisma.projetos.findUnique({
      where: { id: Number(id) },
    });
  },

  criarProjeto: async ({ nome, descricao, usuario_id }) => {
    return prisma.projetos.create({
      data: {
        nome,
        descricao,
        usuario_id: Number(usuario_id),
      },
    });
  },

  atualizarProjeto: async (id, { nome, descricao, usuario_id }) => {
    return prisma.projetos.update({
      where: { id: Number(id) },
      data: {
        nome,
        descricao,
        ...(usuario_id && { usuario_id: Number(usuario_id) }),
      },
    });
  },

  deletarProjeto: async (id) => {
    return prisma.projetos.delete({
      where: { id: Number(id) },
    });
  },
};
