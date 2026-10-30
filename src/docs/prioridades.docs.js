const { json, parametroId } = require("./comum");

const paths = {
  "/prioridades": {
    get: {
      tags: ["Prioridades"],
      summary: "Lista todas as prioridades",
      security: [],
      responses: {
        200: {
          description: "Lista de prioridades",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Prioridade" },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Prioridades"],
      summary: "Cria uma nova prioridade",
      requestBody: {
        required: true,
        content: json("PrioridadeEntrada"),
      },
      responses: {
        201: { description: "Prioridade criada", content: json("Prioridade") },
        400: { description: "Descrição é obrigatória", content: json("Erro") },
      },
    },
  },

  "/prioridades/{id}": {
    get: {
      tags: ["Prioridades"],
      summary: "Busca prioridade pelo ID",
      security: [],
      parameters: [parametroId],
      responses: {
        200: { description: "Prioridade encontrada", content: json("Prioridade") },
        404: { description: "Prioridade não encontrada", content: json("Erro") },
      },
    },
    put: {
      tags: ["Prioridades"],
      summary: "Atualiza uma prioridade",
      parameters: [parametroId],
      requestBody: {
        required: true,
        content: json("PrioridadeEntrada"),
      },
      responses: {
        200: { description: "Prioridade atualizada", content: json("Prioridade") },
        404: { description: "Prioridade não encontrada", content: json("Erro") },
      },
    },
    delete: {
      tags: ["Prioridades"],
      summary: "Remove uma prioridade",
      parameters: [parametroId],
      responses: {
        204: { description: "Prioridade removida com sucesso" },
        404: { description: "Prioridade não encontrada", content: json("Erro") },
      },
    },
  },
};

const schemas = {
  Prioridade: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      descricao: { type: "string", example: "Baixa" },
      ativo: { type: "boolean", example: true },
      cor: { type: "string", example: "#94A3B8" },
      criado_em: { type: "string", format: "date-time" },
    },
  },

  PrioridadeEntrada: {
    type: "object",
    required: ["descricao"],
    properties: {
      descricao: { type: "string", example: "Urgente" },
      ativo: { type: "boolean", example: true },
      cor: { type: "string", example: "#EF4444" },
    },
  },
};

module.exports = { paths, schemas };