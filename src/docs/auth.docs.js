const { json } = require("./comum");

const paths = {
  "/auth/login": {
    post: {
      tags: ["Autenticação"],
      summary: "Realiza login do usuário",
      security: [],
      requestBody: {
        required: true,
        content: json("AuthLoginEntrada"),
      },
      responses: {
        200: {
          description: "Login realizado com sucesso",
          content: json("AuthLoginResposta"),
        },
        401: {
          description: "Credenciais inválidas",
          content: json("Erro"),
        },
      },
    },
  },
};

const schemas = {
  AuthLoginEntrada: {
    type: "object",
    required: ["email", "senha"],
    properties: {
      email: { type: "string", example: "ana@taskflow.com" },
      senha: { type: "string", example: "123456" },
    },
  },
  AuthLoginResposta: {
    type: "object",
    properties: {
      token: {
        type: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
    },
  },
};

module.exports = { paths, schemas };