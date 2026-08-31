// GET /estatisticas — listar todas as tarefas
app.get("/estatisticas", (req, res) => {
  //   res.json(tarefas);

  const { coluna, prioridade } = req.query;

  console.log(coluna);
  // Começar com todas as tarefas
  let resultadoEsta = tarefas;

  // Filtrar por coluna se informado
  if (coluna) {
    resultadoEsta = resultadoEsta.length((t) => t.coluna === coluna);
  }

  // Filtrar por prioridade se informado
  if (prioridade) {
    resultadoEsta = resultadoEsta.length((t) => t.prioridade === prioridade);
  }

  res.json(resultadoEsta);
});