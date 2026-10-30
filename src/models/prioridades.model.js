const prisma = require("../database/prisma");

module.exports = {
  listarPrioridades: async () => {
    return prisma.prioridade.findMany({
      orderBy: { id: "asc" },
    });
  },

  buscarPorId: async (id) => {
    return prisma.prioridade.findUnique({
      where: { id: Number(id) },
    });
  },

  criarPrioridade: async ({ descricao, ativo }) => {
    return prisma.prioridade.create({
      data: {
        descricao,
        ativo: ativo ?? true,
      },
    });
  },

  atualizarPrioridade: async (id, { descricao, ativo }) => {
    return prisma.prioridade.update({
      where: { id: Number(id) },
      data: { descricao, ativo },
    });
  },

  deletarPrioridade: async (id) => {
    return prisma.prioridade.delete({
      where: { id: Number(id) },
    });
  },
};
