"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const repository_candidateprofile_1 = require("../repository/repository-candidateprofile");
const express_1 = require("express");
exports.router = (0, express_1.Router)();
//Define a rota para inserir um elemento no banco
exports.router.post('/candidateprofile/:accountId', async (req, res) => {
    const createBody = req.body;
    createBody.accountId = Number(req.params.accountId);
    try {
        const response = await repository_candidateprofile_1.Repository.CandidateProfile.create(createBody);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
//Define a rota para eliminar um ou mais elementos no banco
exports.router.delete('/candidateprofile', async (req, res) => {
    const idArray = req.query.id?.toString().split(',').map(Number);
    try {
        await repository_candidateprofile_1.Repository.CandidateProfile.remove({ id: idArray });
        res.sendStatus(200);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
//Define a rota para alterar um elemento no banco
exports.router.put('/candidateprofile', async (req, res) => {
    try {
        const updateBody = req.body;
        updateBody.id = Number(req.query.id);
        const response = await repository_candidateprofile_1.Repository.CandidateProfile.update(updateBody);
        res.status(200).send(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
//Define a rota para listar elementos do banco
exports.router.get('/candidateprofile', async (req, res) => {
    const getBody = {
        id: req.query.id?.toString().split(',').map(Number),
        accountId: req.query.accountId?.toString().split(',').map(Number),
        size: req.query.size !== undefined ? Number(req.query.size) : 20,
        page: Number(req.query.page)
    };
    try {
        const response = await repository_candidateprofile_1.Repository.CandidateProfile.select(getBody);
        res.status(200).send(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
