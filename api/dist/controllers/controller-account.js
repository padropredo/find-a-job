"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const repository_account_1 = require("../repository/repository-account");
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.post('/account', async (req, res) => {
    try {
        const response = await repository_account_1.Repository.Account.create(req.body);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.router.delete('/account', (req, res) => {
    try {
        repository_account_1.Repository.Account.remove({ id: Number(req.query.id) });
        res.sendStatus(200);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
//Define a rota para listar elementos do banco
exports.router.get('/account', async (req, res) => {
    try {
        const response = await repository_account_1.Repository.Account.select({ email: req.query.email.toString() });
        res.status(200).send(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
