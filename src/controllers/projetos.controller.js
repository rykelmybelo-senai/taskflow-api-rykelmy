let listaProjetos = [
    {
        id: 1,
        nome: "Projeto 1",
        descricao: "Descrição do Projeto 1",
        status: "ativo",
    },
    {
        id: 2,
        nome: "Projeto 2",
        descricao: "Descrição do Projeto 2",
        status: "ativo",
    },
    {
        id: 3,
        nome: "Projeto 3",
        descricao: "Descrição do Projeto 3",
        status: "inativo",
    }
];

let proximoIdProjeto = 4;

const projetosController = {
    listarProjetos: (req, res) => {
        const { status } = req.query;
        let resultado = listaProjetos;
        if (status) {
            resultado = resultado.filter((p) => p.status === status);
        }
        res.json(resultado);
    },

    buscarProjetoPorId: (req, res) => {
        const id = parseInt(req.params.id);
        const projeto = listaProjetos.find((p) => p.id === id);
        if (!projeto) {
            return res.status(404).json({ message: "Projeto não encontrado" });
        }
        res.json(projeto);
    },

    criarProjeto: (req, res) => {
        const { nome, descricao, status } = req.body;

        if (!nome) return res.status(400).json({ erro: "Nome do projeto é obrigatório" });

        const novoProjeto = {
            id: proximoIdProjeto++,
            nome: nome,
            descricao: descricao,
            status: status || "ativo",
        };
        listaProjetos.push(novoProjeto);
        res.status(201).json(novoProjeto);
    },

    atualizarProjeto: (req, res) => {
        const id = parseInt(req.params.id);
        const idx = listaProjetos.findIndex((p) => p.id === id);

        if (idx === -1)
            return res.status(404).json({ message: "Projeto não encontrado" });
        listaProjetos[idx] = { ...listaProjetos[idx], ...req.body, id };
        res.json(listaProjetos[idx]);
    },

    deletarProjeto: (req, res) => {
        const id = parseInt(req.params.id);
        const idx = listaProjetos.findIndex((p) => p.id === id);

        if (idx === -1) {
            return res.status(404).json({ message: "Projeto não encontrado" });
        }
        const removido = listaProjetos.splice(idx, 1)[0];
        res.json({ message: "Projeto removido", projeto: removido });
    },
};

module.exports = projetosController;