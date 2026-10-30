const { json, parametroId } = require("./comum");

const paths = {
  "/tarefas": {
    get: {
      tags: ["Tarefas"],
      summary: "Lista todas as tarefas",
      responses: {
        200: {
          description: "Lista de tarefas cadastradas",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Tarefa" },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Tarefas"],
      summary: "Cria uma nova tarefa",
      requestBody: {
        required: true,
        content: json("TarefaEntrada"),
      },
      responses: {
        201: { description: "Tarefa criada com sucesso", content: json("Tarefa") },
        400: { description: "Dados inválidos", content: json("Erro") },
        401: { description: "Token ausente ou inválido", content: json("Erro") },
      },
    },
  },

  "/tarefas/estatisticas": {
    get: {
      tags: ["Tarefas"],
      summary: "Estatísticas gerais das tarefas",
      responses: {
        200: {
          description: "Métricas de contagem de tarefas",
          content: json("EstatisticasTarefas"),
        },
      },
    },
  },

  "/tarefas/{id}": {
    get: {
      tags: ["Tarefas"],
      summary: "Busca uma tarefa pelo ID",
      parameters: [parametroId],
      responses: {
        200: { description: "Tarefa encontrada", content: json("Tarefa") },
        400: { description: "ID inválido", content: json("Erro") },
        401: { description: "Token ausente ou inválido", content: json("Erro") },
        404: { description: "Tarefa não encontrada", content: json("Erro") },
      },
    },
    put: {
      tags: ["Tarefas"],
      summary: "Atualiza os dados de uma tarefa",
      parameters: [parametroId],
      requestBody: {
        required: true,
        content: json("TarefaEntrada"),
      },
      responses: {
        200: { description: "Tarefa atualizada com sucesso", content: json("Tarefa") },
        400: { description: "Dados inválidos", content: json("Erro") },
        401: { description: "Token ausente ou inválido", content: json("Erro") },
        404: { description: "Tarefa não encontrada", content: json("Erro") },
      },
    },
    delete: {
      tags: ["Tarefas"],
      summary: "Remove uma tarefa",
      parameters: [parametroId],
      responses: {
        200: {
          description: "Tarefa removida com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  mensagem: { type: "string", example: "Tarefa removida" },
                  tarefa: { $ref: "#/components/schemas/Tarefa" },
                },
              },
            },
          },
        },
        401: { description: "Token ausente ou inválido", content: json("Erro") },
        404: { description: "Tarefa não encontrada", content: json("Erro") },
      },
    },
  },
};

const schemas = {
  Tarefa: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      texto: { type: "string", example: "Revisar rotas da API" },
      coluna: { type: "string", enum: ["afazer", "andamento", "concluido"], example: "afazer" },
      ordem: { type: "integer", example: 0 },
      prioridade_id: { type: "integer", example: 2 },
      usuario_id: { type: "integer", example: 1 },
      projeto_id: { type: "integer", example: 1 },
      cidade: { type: "string", example: "Natal", nullable: true },
      iniciado_em: { type: "string", format: "date-time", nullable: true },
      concluida_em: { type: "string", format: "date-time", nullable: true },
      criado_em: { type: "string", format: "date-time" },
      projeto: { type: "string", example: "TaskFlow Backend" },
      usuario: { type: "string", example: "Ana Lima" },
      prioridade: { type: "string", example: "Média" },
    },
  },

  TarefaEntrada: {
    type: "object",
    required: ["texto", "usuario_id", "projeto_id"],
    properties: {
      texto: { type: "string", example: "Revisar rotas da API" },
      coluna: { type: "string", enum: ["afazer", "andamento", "concluido"], example: "afazer" },
      prioridade_id: { type: "integer", example: 2 },
      usuario_id: { type: "integer", example: 1 },
      projeto_id: { type: "integer", example: 1 },
      cidade: { type: "string", example: "Natal" },
      ordem: { type: "integer", example: 0 },
    },
  },

  EstatisticasTarefas: {
    type: "object",
    properties: {
      totalTarefas: { type: "integer", example: 12 },
      totalPorPrioridade: {
        type: "object",
        properties: {
          1: { type: "integer", example: 3 },
          2: { type: "integer", example: 6 },
          3: { type: "integer", example: 3 },
        },
      },
      porColuna: {
        type: "object",
        properties: {
          afazer: { type: "integer", example: 5 },
          andamento: { type: "integer", example: 2 },
          concluido: { type: "integer", example: 5 },
        },
      },
    },
  },
};

module.exports = { paths, schemas };