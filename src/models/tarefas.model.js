const prisma = require("../database/prisma");

// Função utilitária para manter o formato do JSON esperado pelo Front-end
function formatarTarefa(tarefa) {
  const { projetos, usuarios, prioridade, ...resto } = tarefa;
  return {
    ...resto,
    projeto: projetos?.nome,
    usuario: usuarios?.nome,
    prioridade: prioridade?.descricao,
  };
}

module.exports = {
  listarTarefas: async () => {
    const tarefas = await prisma.tarefas.findMany({
      include: {
        projetos: { select: { nome: true } },
        usuarios: { select: { nome: true } },
        prioridade: { select: { descricao: true } },
      },
      orderBy: { id: "asc" },
    });

    return tarefas.map(formatarTarefa);
  },

  listarPorColuna: async (coluna) => {
    return prisma.tarefas.findMany({
      where: { coluna },
      orderBy: { id: "asc" },
    });
  },

  listarPorPrioridade: async (prioridade_id) => {
    return prisma.tarefas.findMany({
      where: { prioridade_id: Number(prioridade_id) },
      orderBy: { id: "asc" },
    });
  },

  buscarPorId: async (id) => {
    const tarefa = await prisma.tarefas.findUnique({
      where: { id: Number(id) },
      include: {
        projetos: { select: { nome: true } },
        usuarios: { select: { nome: true } },
        prioridade: { select: { descricao: true } },
      },
    });

    return tarefa ? formatarTarefa(tarefa) : null;
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
    const iniciadoEm = coluna === "andamento" ? new Date().toISOString() : null;
    const concluidaEm =
      coluna === "concluido" ? new Date().toISOString() : null;

    return prisma.tarefas.create({
      data: {
        texto,
        prioridade_id: Number(prioridade_id) || 2,
        coluna: coluna || "afazer",
        usuario_id: Number(usuario_id),
        projeto_id: Number(projeto_id),
        cidade: cidade || null,
        ordem: Number(ordem) || 0,
        iniciado_em: iniciadoEm,
        concluida_em: concluidaEm,
      },
    });
  },

  atualizarTarefa: async (id, dadosAtualizados) => {
    const tarefaAtual = await prisma.tarefas.findUnique({
      where: { id: Number(id) },
    });

    if (!tarefaAtual) {
      return null;
    }

    const concluidaEm =
      dadosAtualizados.coluna === "concluido" ? new Date().toISOString() : null;

    let iniciadoEm = tarefaAtual.iniciado_em;

    if (
      (tarefaAtual.coluna === "andamento" ||
        tarefaAtual.coluna === "concluido") &&
      dadosAtualizados.coluna === "afazer"
    ) {
      iniciadoEm = null;
    } else if (
      (tarefaAtual.coluna === "afazer" || tarefaAtual.coluna === "concluido") &&
      dadosAtualizados.coluna === "andamento"
    ) {
      iniciadoEm = new Date().toISOString();
    }

    return prisma.tarefas.update({
      where: { id: Number(id) },
      data: {
        texto: dadosAtualizados.texto,
        prioridade_id: Number(dadosAtualizados.prioridade_id),
        coluna: dadosAtualizados.coluna,
        usuario_id: Number(dadosAtualizados.usuario_id),
        projeto_id: Number(dadosAtualizados.projeto_id),
        cidade: dadosAtualizados.cidade,
        concluida_em: concluidaEm,
        iniciado_em: iniciadoEm,
      },
    });
  },

  deletarTarefa: async (id) => {
    return prisma.tarefas.delete({
      where: { id: Number(id) },
    });
  },

  estatisticasTarefas: async () => {
    const totalTarefas = await prisma.tarefas.count();

    const totalPorPrioridadeResult = await prisma.tarefas.groupBy({
      by: ["prioridade_id"],
      _count: { _all: true },
      orderBy: { prioridade_id: "asc" },
    });

    const totalPorPrioridade = totalPorPrioridadeResult.reduce((acc, row) => {
      acc[row.prioridade_id] = row._count._all;
      return acc;
    }, {});

    const porColunaResult = await prisma.tarefas.groupBy({
      by: ["coluna"],
      _count: { _all: true },
    });

    const porColuna = porColunaResult.reduce((acc, row) => {
      acc[row.coluna] = row._count._all;
      return acc;
    }, {});

    return { totalTarefas, totalPorPrioridade, porColuna };
  },
};
