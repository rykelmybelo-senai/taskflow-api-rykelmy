console.log("TaskFlow API — pronto para o Express!!!");

const express = require("express");

const tarefasRoutes = require("./src/routes/tarefas.routes");
const usuariosRoutes = require("./src/routes/usuarios.routes");

const app = express();
const PORTA = 3000;

//Processa a requisição antes de chegar na rota.
app.use(express.json());

app.use("/tarefas", tarefasRoutes);
app.use("/usuarios", usuariosRoutes);

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
