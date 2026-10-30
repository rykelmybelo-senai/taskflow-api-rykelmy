const json = (nome) => ({
  "application/json": {
    schema: { $ref: `#/components/schemas/${nome}` },
  },
});

const parametroId = {
  name: "id",
  in: "path",
  required: true,
  schema: { type: "integer", example: 1 },
};

const schemas = {
  Erro: {
    type: "object",
    properties: {
      erro: {
        type: "object",
        properties: {
          mensagem: { type: "string", example: "Recurso não encontrado" },
          detalhes: {
            type: "array",
            items: { type: "string" },
            example: ["O campo e-mail deve ser um endereço válido"],
          },
        },
      },
    },
  },
};

module.exports = { json, parametroId, schemas };