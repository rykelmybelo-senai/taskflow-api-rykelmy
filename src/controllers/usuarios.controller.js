let listaUsuarios = [
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

const usuariosController = {
  listarUsuarios: (req, res) => {
    let { id, nome, email } = req.query;

    console.log(id);
    console.log(nome);
    console.log(email);
    // Começar com todas os usuarios
    let resultadoUser = listaUsuarios;

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
  },

  buscarUsuarioPorId: (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = listaUsuarios.find((u) => u.id === id);
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado!" });
    }
    res.json(usuario);
  },

  criarUsuario: (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha)
      return res
        .status(400)
        .json({ erro: "Nome, email e senha são obrigatórios!" });

    if (listaUsuarios.find((u) => u.email === email))
      return res
        .status(400)
        .json({ erro: "Email já cadastrado, informe outro email!" });

    const novoUsuario = {
      id: proximoId++,
      nome: nome,
      email: email,
      senha: senha,
    };

    listaUsuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
  },

  atualizarUsuario: (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email, senha } = req.body;
    const indice = listaUsuarios.findIndex((u) => u.id === id);

    // Se não encontrou — retornar 404
    if (indice === -1) {
      return res.status(404).json({ erro: "Usuario não encontrado" });
    }

    // Substituir o usuario no array mantendo o mesmo ID
    const usuarioAtualizado = { id, nome, email, senha };
    listaUsuarios[indice] = usuarioAtualizado;

    // Retornar o usuario atualizado com status 200
    res.json(usuarioAtualizado);
  },

  deletarUsuario: (req, res) => {
    const id = parseInt(req.params.id);
    const indice = listaUsuarios.findIndex((u) => u.id === id);

    if (indice === -1) {
      return res.status(404).json({ erro: "Usuario não encontrado" });
    }

    // Remover do array
    const removida = listaUsuarios.splice(indice, 1)[0];

    // Retornar confirmação da remoção
    res.json({ mensagem: "Usuario removido com sucesso", tarefa: removida });
  },
};

module.exports = usuariosController;
