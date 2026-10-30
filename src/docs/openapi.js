const comum = require("./comum");
const auth = require("./auth.docs");
const tarefas = require("./tarefas.docs");
const projetos = require("./projetos.docs");
const usuarios = require("./usuarios.docs");
const prioridades = require("./prioridades.docs");

module.exports = {
  openapi: "3.0.3",
  info: {
    title: "TaskFlow API",
    version: "1.0.0",
    description: "API do TaskFlow — SENAI CTGAS-ER",
  },

  servers: [
    { url: "http://localhost:3000", description: "Ambiente Local" },
  ],

  security: [{ bearerAuth: [] }],

  paths: {
    ...auth.paths,
    ...tarefas.paths,
    ...projetos.paths,
    ...usuarios.paths,
    ...prioridades.paths,
  },

  components: {
    schemas: {
      ...comum.schemas,
      ...auth.schemas,
      ...tarefas.schemas,
      ...projetos.schemas,
      ...usuarios.schemas,
      ...prioridades.schemas,
    },

    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};