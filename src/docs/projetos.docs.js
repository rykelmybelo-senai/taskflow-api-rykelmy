const { json, parametroId } = require("./comum");

const paths = {
  "/projetos": {
    get: {
      tags: ["Projetos"],
      summary: "Lista todos os projetos",
      parameters: [
        {
          name: "nome",
          in: "query",
          schema: { type: "string" },
          description: "Filtrar por nome do projeto",
        },
      ],
      responses: {
        200: {
          description: "Lista de projetos",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Projeto" },
              },
            },
          },
        },
        404: { description: "Projeto não encontrado com esse nome", content: json("Erro") },
      },
    },
    post: {
      tags: ["Projetos"],
      summary: "Cria um novo projeto",
      requestBody: {
        required: true,
        content: json("ProjetoEntrada"),
      },
      responses: {
        201: { description: "Projeto criado com sucesso", content: json("Projeto") },
        400: { description: "Dados inválidos", content: json("Erro") },
      },
    },
  },

  "/projetos/{id}": {
    get: {
      tags: ["Projetos"],
      summary: "Busca um projeto pelo ID",
      parameters: [parametroId],
      responses: {
        200: { description: "Projeto encontrado", content: json("Projeto") },
        404: { description: "Projeto não encontrado", content: json("Erro") },
      },
    },
    put: {
      tags: ["Projetos"],
      summary: "Atualiza um projeto",
      parameters: [parametroId],
      requestBody: {
        required: true,
        content: json("ProjetoEntrada"),
      },
      responses: {
        200: { description: "Projeto atualizado", content: json("Projeto") },
        404: { description: "Projeto não encontrado", content: json("Erro") },
      },
    },
    delete: {
      tags: ["Projetos"],
      summary: "Remove um projeto",
      parameters: [parametroId],
      responses: {
        204: { description: "Projeto removido com sucesso" },
        404: { description: "Projeto não encontrado", content: json("Erro") },
        409: { description: "Não é possível excluir projeto com tarefas associadas", content: json("Erro") },
      },
    },
  },
};

const schemas = {
  Projeto: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      nome: { type: "string", example: "TaskFlow Web" },
      descricao: { type: "string", example: "Aplicação Kanban de gestão de tarefas" },
      usuario_id: { type: "integer", example: 1 },
      criado_em: { type: "string", format: "date-time" },
    },
  },

  ProjetoEntrada: {
    type: "object",
    required: ["nome", "usuario_id"],
    properties: {
      nome: { type: "string", example: "TaskFlow Web" },
      descricao: { type: "string", example: "Aplicação Kanban de gestão de tarefas" },
      usuario_id: { type: "integer", example: 1 },
    },
  },
};

module.exports = { paths, schemas };