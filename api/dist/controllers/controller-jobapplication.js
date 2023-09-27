"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const repository_jobapplication_1 = require("../repository/repository-jobapplication");
const express_1 = require("express");
exports.router = (0, express_1.Router)();
//Define a rota para inserir um elemento no banco
exports.router.post('/jobapplication', async (req, res) => {
    const createBody = req.body;
    try {
        const response = await repository_jobapplication_1.Repository.JobApplication.create(createBody);
        res.status(200).send(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
//Define a rota para eliminar um ou mais elementos no banco
exports.router.delete('/jobapplication', async (req, res) => {
    const idArray = req.query.id?.toString().split(',').map(Number);
    try {
        await repository_jobapplication_1.Repository.JobApplication.remove({ id: idArray });
        res.sendStatus(200);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
//Define a rota para alterar um elemento no banco
exports.router.put('/jobapplication', async (req, res) => {
    try {
        const updateBody = req.body;
        updateBody.id = Number(req.query.id);
        const response = await repository_jobapplication_1.Repository.JobApplication.update(updateBody);
        res.status(200).send(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
//Define a rota para listar elementos do banco
exports.router.get('/jobapplication', async (req, res) => {
    const getBody = {
        id: req.query.id?.toString().split(',').map(Number),
        candidateProfileId: req.query.candidateProfileId?.toString().split(',').map(Number),
        jobOfferId: req.query.jobOfferId?.toString().split(',').map(Number),
        size: req.query.size !== undefined ? Number(req.query.size) : 20,
        page: Number(req.query.page)
    };
    try {
        const response = await repository_jobapplication_1.Repository.JobApplication.select(getBody);
        res.status(200).send(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
