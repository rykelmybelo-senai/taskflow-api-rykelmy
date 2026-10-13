const listaProjetos = require("../models/projetos.model");

const projetosController = {
    async listarProjetos (req, res) {
        const { nome, status } = req.query;
        let resultado = await listaProjetos.listarProjetos(nome, status);

        if (nome && resultado.length === 0) {
            return res.status(404).json({ message: "Nome não encontrado." });
        }
        if (status && status !== "ativo" && status !== "inativo") {
            return res.status(404).json({ message: "Status não encontrado, procure por ativo ou inativo." }); 
        }
        if (!status && !nome && Object.keys(req.query).length > 0) {
            return res.status(400).json({ message: "Filtro inválido, busque por um status válido." });
        }
        res.json(resultado);
    },

    async buscarProjetoPorId (req, res) {
        const id = parseInt(req.params.id);
        const projeto = await listaProjetos.buscarProjetoPorId(id);
        if (!projeto) {
            return res.status(404).json({ message: "Projeto não encontrado" });
        }
        res.json(projeto);
    },

    async criarProjeto (req, res) {
        const { nome, descricao, status } = req.body;

        if (!nome) return res.status(400).json({ erro: "Nome do projeto é obrigatório." });
        const novoProjeto = await listaProjetos.criarProjeto({ nome, descricao, status });
        res.status(201).json(novoProjeto);
    },

    async atualizarProjeto (req, res) {
        const id = parseInt(req.params.id);
        const { nome, descricao, status } = req.body;
        const projeto = await listaProjetos.atualizarProjeto({ id, nome, descricao, status });
        
        if (!projeto) {
            return res.status(404).json({ message: "Projeto não encontrado" });
        }
        res.json(projeto);
    },

    async deletarProjeto (req, res) {
        const id = parseInt(req.params.id);

        if (!listaProjetos.buscarProjetoPorId(id)) {
            return res.status(404).json({ message: "Projeto não encontrado" });
        }
        const removido = await listaProjetos.deletarProjeto(id);
        res.json(removido);
    },
};

module.exports = projetosController;