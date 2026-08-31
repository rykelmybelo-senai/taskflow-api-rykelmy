console.log("TaskFlow API — pronto para o Express!!!");

const express = require("express");

const app = express();

const PORTA = 3000;

let proximoId = 4; // começa em 4 pois já temos 3 tarefas

//Processa a requisição antes de chegar na rota.
app.use(express.json());

//-----USUARIOS-----
// Dados em memória — substitui o banco por enquanto
let usuarios = [
  {
    id: 1,
    nome: "Ronaldo",
    email: "ronaldouserteste@email.com",
    senha: "@Teste1234"
  },
  {
    id: 2,
    nome: "Marcelo",
    email: "marcelouserteste@email.com",
    senha: "@TesteSenai@456"
  },
  {
    id: 3,
    nome: "Cleide",
    email: "cleideuserteste@email.com",
    senha: "@Teste@321"
  },
];

// GET /usuarios — listar todos os usuarios
app.get("/usuarios", (req, res) => {
  //   res.json(usuarios);

  let { id, nome, email } = req.query;

  console.log(id);
  console.log(nome);
  console.log(email);
  // Começar com todas os usuarios
  let resultadoUser = usuarios;

  // Filtrar por id se informado
  if (id) {
    resultadoUser = resultadoUser.filter((u) => u.id === id);
  }

  // Filtrar por nome se informado
  if (nome) {
    resultadoUser = resultadoUser.filter((u) => u.nome === nome);
  }

  // Filtrar por email se informado
  if (email) {
    resultadoUser = resultadoUser.filter((u) => u.email === email);
  }

  res.json(resultadoUser);
});


app.post("/usuarios", (req, res) => {
  // req.body contém os dados enviados no body da requisição
  const { nome, email, senha } = req.body;

  // Criar a nova tarefa com ID gerado pelo servidor
  const novoUsuario = {
    id: proximoId++, // usa o ID atual e incrementa
    nome: nome,
    email: email || "user@email.com", // valor padrão se não enviado
    senha: senha || "admin1234"
  };

  // Adicionar ao array em memória
  usuarios.push(novoUsuario);

  // Retornar o usuario criado com status 201
  res.status(201).json(novoUsuario);
});

app.get("/usuarios/:id", (req, res) => {
  // req.params.id chega como STRING — converter para número
  const id = Number(req.params.id);

  // Buscar o usuario no array
  const usuario = usuarios.find((u) => u.id === id);

  // Se não encontrou — retornar 404
  if (!usuario) {
    return res.status(404).json({ erro: "Usuario não encontrado" });
  }

  // Se encontrou — retornar o usuario
  res.json(usuario);
});

app.put("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);

  const { nome, email, senha } = req.body;

  // Encontrar o índice do usuario no array
  const indice = usuarios.findIndex((u) => u.id === id);

  // Se não encontrou — retornar 404
  if (indice === -1) {
    return res.status(404).json({ erro: "Usuario não encontrado" });
  }

  // Substituir o usuario no array mantendo o mesmo ID
  const usuarioAtualizado = { id, nome, email, senha };

  usuarios[indice] = usuarioAtualizado;

  // Retornar o usuario atualizado com status 200
  res.json(usuarioAtualizado);
});

app.delete("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);

  // Verificar se o usuario existe antes de remover
  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({ erro: "Usuario não encontrado" });
  }

  // Remover do array com filter
  usuarios = usuarios.filter((u) => u.id !== id);

  // Retornar confirmação da remoção
  res.json({ mensagem: "Usuario removido com sucesso", id });
});

//-----TAREFAS-----
// Dados em memória — substitui o banco por enquanto
let tarefas = [
  {
    id: 1,
    texto: "Estudar Node",
    prioridade: "alta",
    coluna: "afazer",
    cidade: "Natal/RN",
  },
  {
    id: 2,
    texto: "Criar API",
    prioridade: "alta",
    coluna: "andamento",
    cidade: "Natal/RN",
  },
  {
    id: 3,
    texto: "Testar Postman",
    prioridade: "media",
    coluna: "concluido",
    cidade: "Natal/RN",
  },
];

app.get("/", (req, res) => {
  res.json({ api: "TaskFlow", versao: "1.0", status: "online" });
});

//-----ESTATISTICAS-----
// GET /estatisticas — listar todas as tarefas
// app.get("/estatisticas", (req, res) => {
//   //   res.json(tarefas);

//   const { coluna, prioridade } = req.query;

//   console.log(coluna);
//   // Começar com todas as tarefas
//   let resultadoEsta = tarefas;
//   // let filterColuna = (t) => t.coluna.length;
//   // let filterPrioridade = (t) => t.prioridade.length;

//   // Filtrar por coluna se informado
//   if (coluna) {
//     resultadoEsta = resultadoEsta.filter((t) => t.coluna === coluna);
//   }

//   if (prioridade) {
//     resultadoEsta = resultadoEsta.filter((t) => t.prioridade === prioridade);
//   }

//   res.json(resultadoEsta.length);
// });

// // GET /estatisticas — listar todas as tarefas
// app.get("/estatisticas/resumo", (req, res) => {
//   //   res.json(tarefas);

//   const { coluna, prioridade } = req.query;

//   console.log(coluna);
//   // Começar com todas as tarefas
//   let resultadoEsta = tarefas;
//   // let filterColuna = (t) => t.coluna.length;
//   // let filterPrioridade = (t) => t.prioridade.length;
//   // let filterColuna
//   // let filterPrioridade
//   // Filtrar por coluna se informado
//   if (coluna) {
//     resultadoEsta = resultadoEsta.filter((t) => t.coluna === coluna);
//   }

//   if (prioridade) {
//     resultadoEsta = resultadoEsta.filter((t) => t.prioridade === prioridade);
//   }

//   res.json(`Você tem ${resultadoEsta.length} tarefas`);
// });

// GET /tarefas — listar todas as tarefas
app.get("/tarefas", (req, res) => {
  //   res.json(tarefas);

  const { coluna, prioridade } = req.query;

  console.log(coluna);
  // Começar com todas as tarefas
  let resultado = tarefas;

  // Filtrar por coluna se informado
  if (coluna) {
    resultado = resultado.filter((t) => t.coluna === coluna);
  }

  // Filtrar por prioridade se informado
  if (prioridade) {
    resultado = resultado.filter((t) => t.prioridade === prioridade);
  }

  res.json(resultado);
});


app.post("/tarefas", (req, res) => {
  // req.body contém os dados enviados no body da requisição
  const { texto, prioridade, coluna, cidade } = req.body;

  // Criar a nova tarefa com ID gerado pelo servidor
  const novaTarefa = {
    id: proximoId++, // usa o ID atual e incrementa
    texto: texto,
    prioridade: prioridade || "media", // valor padrão se não enviado
    coluna: coluna || "afazer",
    cidade: cidade || "",
  };

  // Adicionar ao array em memória
  tarefas.push(novaTarefa);

  // Retornar a tarefa criada com status 201 Created
  res.status(201).json(novaTarefa);
});

app.get("/tarefas/:id", (req, res) => {
  // req.params.id chega como STRING — converter para número
  const id = Number(req.params.id);

  // Buscar a tarefa no array
  const tarefa = tarefas.find((t) => t.id === id);

  // Se não encontrou — retornar 404

  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  // Se encontrou — retornar a tarefa
  res.json(tarefa);
});

app.put("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);

  const { texto, prioridade, coluna, cidade } = req.body;

  // Encontrar o índice da tarefa no array
  const indice = tarefas.findIndex((t) => t.id === id);

  // Se não encontrou — retornar 404
  if (indice === -1) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  // Substituir a tarefa no array mantendo o mesmo ID
  const tarefaAtualizada = { id, texto, prioridade, coluna, cidade };

  tarefas[indice] = tarefaAtualizada;

  // Retornar a tarefa atualizada com status 200
  res.json(tarefaAtualizada);
});

app.delete("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);

  // Verificar se a tarefa existe antes de remover
  const tarefa = tarefas.find((t) => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  // Remover do array com filter
  tarefas = tarefas.filter((t) => t.id !== id);

  // Retornar confirmação da remoção
  res.json({ mensagem: "Tarefa removida com sucesso", id });
});

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
