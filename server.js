console.log("TaskFlow API — pronto para o Express!!!");
require("dotenv").config();

const express = require("express");
const authRoutes = require("./src/routes/auth.routes");
const tarefasRoutes = require("./src/routes/tarefas.routes");
const usuariosRoutes = require("./src/routes/usuarios.routes");
const projetosRoutes = require("./src/routes/projetos.routes");
const prioridadesRoutes = require("./src/routes/prioridades.routes");
const autenticar = require("./src/middlewares/autenticar");
const tratarErros = require("./src/middlewares/erro.middleware");
const criarErro = require('./src/utils/criarErro');

const logger = require("./src/middlewares/logger");
const validarContentType = require("./src/middlewares/validarContentType");
const temporizador = require("./src/middlewares/temporizador");
const cors = require("cors");

const pool = require("./src/database/db");

const app = express();
const PORTA = process.env.PORTA || 3000;

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Banco conectado: ", res.rows[0].now);
  }
});

//Processa a requisição antes de chegar na rota.
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
app.use(logger); //middleware, vem antes das rotas.

app.use("/tarefas", autenticar, tarefasRoutes);
app.use("/usuarios", autenticar, usuariosRoutes);
app.use("/projetos", autenticar, projetosRoutes);
app.use("/auth", authRoutes);
app.use("/prioridades", autenticar,prioridadesRoutes);

app.use((req, res) => {
  const rota = `${req.method} ${req.url}`;
  throw criarErro(404, `Rota ${rota} não encontrada`);
});

app.use(tratarErros);

app.listen(PORTA, () => console.log(`Porta ${PORTA}`));

// 5. Iniciar o servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
