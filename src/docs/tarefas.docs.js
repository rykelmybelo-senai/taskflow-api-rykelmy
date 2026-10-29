const paths = {
  "/tarefas": {
    get: {
      tags: ["Tarefas"],

      summary: "Lista todas as tarefas",

      responses: {
        200: { description: "Lista de tarefas" },
      },
    },
  },
};

const schemas = {
  Tarefa: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },

      texto: { type: "string", example: "Revisar layout" },

      coluna: { type: "string", enum: ["afazer", "andamento", "concluido"] },

      iniciada_em: { type: "string", format: "date-time", nullable: true },

      // ... os demais campos, no mesmo padrão
    },
  },
};

module.exports = { paths, schemas };
