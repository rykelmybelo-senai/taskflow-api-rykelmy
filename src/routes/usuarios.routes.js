//Rotas de usuarios

const express = require("express");
const router = express.Router();

let usuarios = [
  {
    id: 1,
    nome: "Ronaldo",
    email: "ronaldouserteste@email.com",
    senha: "@Teste1234",
  },
  {
    id: 2,
    nome: "Marcelo",
    email: "marcelouserteste@email.com",
    senha: "@TesteSenai@456",
  },
  {
    id: 3,
    nome: "Cleide",
    email: "cleideuserteste@email.com",
    senha: "@Teste@321",
  },
];

let proximoId = 4;

router.get("/", (req, res) => {
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

router.post("/", (req, res) => {
  // req.body contém os dados enviados no body da requisição
  const { nome, email, senha } = req.body;

  // Criar a nova tarefa com ID gerado pelo servidor
  const novoUsuario = {
    id: proximoId++, // usa o ID atual e incrementa
    nome: nome,
    email: email || "user@email.com", // valor padrão se não enviado
    senha: senha || "admin1234",
  };

  // Adicionar ao array em memória
  usuarios.push(novoUsuario);

  // Retornar o usuario criado com status 201
  res.status(201).json(novoUsuario);
});

router.get("/:id", (req, res) => {
  // req.params.id chega como STRING — converter para número
  const id = parseInt(req.params.id);

  // Buscar o usuario no array
  const usuario = usuarios.find((u) => u.id === id);

  // Se não encontrou — retornar 404
  if (!usuario) {
    return res.status(404).json({ erro: "Usuario não encontrado" });
  }

  // Se encontrou — retornar o usuario
  res.json(usuario);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

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

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Verificar se o usuario existe antes de remover
  const indice = usuarios.findIndex((u) => u.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: "Usuario não encontrado" });
  }

  // Remover do array
  const removida = usuarios.splice(indice, 1)[0];

  // Retornar confirmação da remoção
  res.json({ mensagem: "Usuario removido com sucesso", tarefa: removida });
});

module.exports = router;
