const schemas = {
  tarefa: {
    texto: { obrigatorio: true, tipo: "string" },
    coluna: {
      obrigatorio: true,
      tipo: "string",
      enum: ["afazer", "andamento", "concluido"],
    },
    //Implementar isso no Tarefas
    // ordem: { obrigatorio: false, tipo: "number" },
    projeto_id: { obrigatorio: true, tipo: "number" },
    usuario_id: { obrigatorio: true, tipo: "number" },
    // criado_em: { obrigatorio: false, tipo: "string", formato: "data" },
    cidade: { obrigatorio: false, tipo: "string" },
    prioridade_id: { obrigatorio: true, tipo: "number" },
    // iniciado_em: { obrigatorio: false, tipo: "string", formato: "data" },
    // concluido_em: { obrigatorio: false, tipo: "string", formato: "data" },
  },

  usuario: {
    nome: { obrigatorio: true, tipo: "string", minLength: 3 },
    email: { obrigatorio: true, tipo: "string", formato: "email" },
    senha: { obrigatorio: true, tipo: "string", minLength: 6 },
  },

  projeto: {
    nome: { obrigatorio: true, tipo: "string" },
    descricao: { obrigatorio: false, tipo: "string", maxLength: 200 },
  },
};
module.exports = schemas;
