const { json, parametroId } = require("./comum");

const paths = {
  "/usuarios": {
    get: {
      tags: ["Usuários"],
      summary: "Lista todos os usuários",
      parameters: [
        { name: "nome", in: "query", schema: { type: "string" } },
        { name: "email", in: "query", schema: { type: "string" } },
      ],
      responses: {
        200: {
          description: "Lista de usuários",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Usuario" },
              },
            },
          },
        },
        404: { description: "Nenhum usuário encontrado", content: json("Erro") },
      },
    },
    post: {
      tags: ["Usuários"],
      summary: "Cadastra um novo usuário",
      requestBody: {
        required: true,
        content: json("UsuarioEntrada"),
      },
      responses: {
        201: {
          description: "Usuário criado com sucesso",
          content: json("UsuarioCriadoResposta"),
        },
        400: { description: "Dados inválidos", content: json("Erro") },
        409: { description: "E-mail já cadastrado", content: json("Erro") },
      },
    },
  },

  "/usuarios/{id}": {
    get: {
      tags: ["Usuários"],
      summary: "Busca usuário pelo ID",
      parameters: [parametroId],
      responses: {
        200: { description: "Usuário encontrado", content: json("Usuario") },
        404: { description: "Usuário não encontrado", content: json("Erro") },
      },
    },
    put: {
      tags: ["Usuários"],
      summary: "Atualiza um usuário",
      parameters: [parametroId],
      requestBody: {
        required: true,
        content: json("UsuarioEntrada"),
      },
      responses: {
        200: {
          description: "Usuário atualizado com sucesso",
          content: json("UsuarioCriadoResposta"),
        },
        404: { description: "Usuário não encontrado", content: json("Erro") },
      },
    },
    delete: {
      tags: ["Usuários"],
      summary: "Remove um usuário",
      parameters: [parametroId],
      responses: {
        200: {
          description: "Usuário removido",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  mensagem: { type: "string", example: "Usuário removido" },
                  usuario: { $ref: "#/components/schemas/Usuario" },
                },
              },
            },
          },
        },
        404: { description: "Usuário não encontrado", content: json("Erro") },
        409: { description: "Não é possível excluir usuário com tarefas ou projetos vinculados", content: json("Erro") },
      },
    },
  },
};

const schemas = {
  Usuario: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      nome: { type: "string", example: "Ana Silva" },
      email: { type: "string", example: "ana@taskflow.com" },
      criado_em: { type: "string", format: "date-time" },
    },
  },

  UsuarioEntrada: {
    type: "object",
    required: ["nome", "email", "senha"],
    properties: {
      nome: { type: "string", example: "Ana Silva" },
      email: { type: "string", example: "ana@taskflow.com" },
      senha: { type: "string", example: "123456" },
    },
  },

  UsuarioCriadoResposta: {
    type: "object",
    properties: {
      mensagem: { type: "string", example: "Usuário criado com sucesso!" },
      usuario: { $ref: "#/components/schemas/Usuario" },
    },
  },
};

module.exports = { paths, schemas };