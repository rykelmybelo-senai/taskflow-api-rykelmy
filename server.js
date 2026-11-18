const app = require("./app");
const prisma = require("./src/database/prisma");
const PORTA = process.env.PORTA || 3000;

prisma
  .$connect()
  .then(() => console.log("Banco conectado"))
  .catch((err) => console.error("Erro ao conectar:", err.message));

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
