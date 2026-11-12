function formatarTarefa(tarefa) {
  const { projetos, usuarios, prioridade, ...resto } = tarefa;
  return {
    ...resto,
    projeto: projetos?.nome,
    usuario: usuarios?.nome,
    prioridade: prioridade?.descricao,
    cor: prioridade?.cor,
  };
}
module.exports = formatarTarefa;
