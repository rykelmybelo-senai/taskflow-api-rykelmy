console.log("TaskFlow API — pronto para o Express!!!");
require ('dotenv').config();

const express = require("express");
const tarefasRoutes = require("./src/routes/tarefas.routes");
const usuariosRoutes = require("./src/routes/usuarios.routes");
const projetosRoutes = require("./src/routes/projetos.routes");
const logger = require("./src/middlewares/logger");
const validarContentType = require("./src/middlewares/validarContentType");
const temporizador = require("./src/middlewares/temporizador");
const cors = require("cors");

const app = express();
const PORTA = process.env.PORTA || 3000;

//Processa a requisição antes de chegar na rota.
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
}));
app.use(express.json());
app.use(validarContentType);
app.use(temporizador);
app.use(logger); //middleware, vem antes das rotas.

app.use("/tarefas", tarefasRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/projetos", projetosRoutes);
app.use((req, res) => {
  res.status(404).json({
    erro: "Rota não encontrada",
    metodo: req.method,
    caminho: req.url,
  });
});

app.listen(PORTA, () => console.log(`Porta ${PORTA}`));

// 5. Iniciar o servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
