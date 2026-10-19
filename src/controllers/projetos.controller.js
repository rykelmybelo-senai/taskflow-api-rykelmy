const listaProjetos = require("../models/projetos.model");
const criarErro = require("../utils/criarErro");


const projetosController = {
    async listarProjetos (req, res) {
        const { nome, status } = req.query;
        let resultado = await listaProjetos.listarProjetos(nome, status);

        if (nome && resultado.length === 0) {
            throw criarErro(404, "Nome não encontrado.");
        }
        if (status && status !== "ativo" && status !== "inativo") {
            throw criarErro(404, "Status não encontrado, procure por ativo ou inativo.");
        }
        if (!status && !nome && Object.keys(req.query).length > 0) {
            throw criarErro(400, "Filtro inválido, busque por um status válido.");
        }
        res.json(resultado);
    },

    async buscarProjetoPorId (req, res) {
        const id = parseInt(req.params.id);
        const projeto = await listaProjetos.buscarProjetoPorId(id);
        if (!projeto) {
            throw criarErro(404, "Projeto não encontrado");
        }
        res.json(projeto);
    },

    async criarProjeto (req, res) {
        const { nome, descricao, status } = req.body;

        if (!nome) {
            throw criarErro(400, "Nome do projeto é obrigatório.");
        }
        const novoProjeto = await listaProjetos.criarProjeto({ nome, descricao, status });
        res.status(201).json(novoProjeto);
    },

    async atualizarProjeto (req, res) {
        const id = parseInt(req.params.id);
        const { nome, descricao, status } = req.body;
        const projeto = await listaProjetos.atualizarProjeto({ id, nome, descricao, status });
        
        if (!projeto) {
            throw criarErro(404, "Projeto não encontrado");
        }
        res.json(projeto);
    },

    async deletarProjeto (req, res) {
        const id = parseInt(req.params.id);

        if (!listaProjetos.buscarProjetoPorId(id)) {
            throw criarErro(404, "Projeto não encontrado");
        }
        const removido = await listaProjetos.deletarProjeto(id);
        res.json(removido);
    },
};

module.exports = projetosController;