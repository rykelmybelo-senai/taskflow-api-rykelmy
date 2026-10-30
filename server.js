console.log("TaskFlow API — pronto para o Express!!!");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const authRoutes = require("./src/routes/auth.routes");
const tarefasRoutes = require("./src/routes/tarefas.routes");
const usuariosRoutes = require("./src/routes/usuarios.routes");
const projetosRoutes = require("./src/routes/projetos.routes");
const prioridadesRoutes = require("./src/routes/prioridades.routes");

const autenticar = require("./src/middlewares/autenticar");
const tratarErros = require("./src/middlewares/erro.middleware");
const criarErro = require("./src/utils/criarErro");
const logger = require("./src/middlewares/logger");
const validarContentType = require("./src/middlewares/validarContentType");
const temporizador = require("./src/middlewares/temporizador");

const openapi = require("./src/docs/openapi");
const pool = require("./src/database/db");

const app = express();
const PORTA = process.env.PORTA || 3000;

// Teste de conexão com o banco
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Banco conectado: ", res.rows[0].now);
  }
});

// Middlewares globais
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  }),
);

app.use(express.json());
app.use(validarContentType);
app.use(temporizador);
app.use(logger);

// Documentação
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

// Rotas públicas
app.use("/auth", authRoutes);

// Rotas protegidas (autenticar deve ficar dentro de usuarios.routes para permitir cadastro público)
app.use("/usuarios", autenticar, usuariosRoutes);
app.use("/tarefas", autenticar, tarefasRoutes);
app.use("/projetos", autenticar, projetosRoutes);
app.use("/prioridades", autenticar, prioridadesRoutes);

// Tratamento de rota não encontrada (404)
app.use((req, res) => {
  const rota = `${req.method} ${req.url}`;
  throw criarErro(404, `Rota ${rota} não encontrada`);
});

// Middleware global de tratamento de erros
app.use(tratarErros);

// Inicialização do servidor (apenas uma chamada)
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
