"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const controller_joboffer_1 = require("./controllers/controller-joboffer");
const controller_account_1 = require("./controllers/controller-account");
const controller_candidateprofile_1 = require("./controllers/controller-candidateprofile");
const controller_jobapplication_1 = require("./controllers/controller-jobapplication");
//Permite o uso de variaveis de ambiente atraves da lib dotenv
dotenv.config();
//Inicializa a aplicacao express
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//Determina a porta onde a API irá escutar
const port = process.env.API_PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));
//Adiciona as rotas definidas a aplicação
app.use(controller_joboffer_1.router);
app.use(controller_account_1.router);
app.use(controller_candidateprofile_1.router);
app.use(controller_jobapplication_1.router);
