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

module.exports = {
  listarUsuarios: (nome, email) => {
    let totalUsuarios = listaUsuarios;
    
    if (nome) {
      totalUsuarios = totalUsuarios.filter((u) => u.nome === nome);
    }
    if (email) {
      totalUsuarios = totalUsuarios.filter((u) => u.email === email);
    }
    return totalUsuarios;
  },
  
    buscarUsuarioPorEmail: (email) => listaUsuarios.find((u) => u.email === email),
    buscarUsuarioPorId: (id) => listaUsuarios.find((u) => u.id === id),
    criarUsuario: ({ nome, email, senha }) => {
    const novoUsuario = {
      id: proximoId++,
      nome: nome,
      email: email,
      senha: senha,
    };
    listaUsuarios.push(novoUsuario);
    return novoUsuario;
  },

    atualizarUsuario: (id, dadosAtualizados) => {
    const usuarioIndex = listaUsuarios.findIndex((u) => u.id === id);
    if (usuarioIndex === -1) return null;
    listaUsuarios[usuarioIndex] = { ...listaUsuarios[usuarioIndex], ...dadosAtualizados };
    return listaUsuarios[usuarioIndex];
  },

    deletarUsuario: (id) => {
    const usuarioIndex = listaUsuarios.findIndex((u) => u.id === id);
    if (usuarioIndex === -1) return false;
    const removido = listaUsuarios.splice(usuarioIndex, 1)[0];
    return (removido);
  },
};