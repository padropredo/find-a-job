"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameters = exports.Repository = void 0;
const database_1 = require("./database");
//Define os comandos para serem executados no banco de dados
const Queries = {
    Account: {
        Select(parameters) {
            return ({
                text: 'SELECT * FROM Account WHERE email = $1',
                values: [parameters.email],
            });
        },
        // Função para gerar query para inserir novos itens
        Create(parameters) {
            return ({
                text: 'INSERT INTO Account (email, password, type) VALUES ($1, $2, $3) RETURNING *',
                values: [parameters.email, parameters.password, parameters.type],
            });
        },
        // Função para gerar query para deletar um ou mais itens
        Remove(parameters) {
            return ({
                text: 'DELETE FROM Account WHERE id = $1',
                values: [parameters.id],
            });
        }
    },
};
// Esse namespace exporta as funções que chamam a execução das queries
var Repository;
(function (Repository) {
    let Account;
    (function (Account) {
        async function create(parameters) {
            try {
                const req = await database_1.pool.query(Queries.Account.Create(parameters));
                return req.rows[0];
            }
            catch (err) {
                throw err;
            }
        }
        Account.create = create;
        ;
        async function remove(parameters) {
            try {
                const req = await database_1.pool.query(Queries.Account.Remove(parameters));
                return req.rows[0];
            }
            catch (err) {
                throw err;
            }
        }
        Account.remove = remove;
        ;
        async function select(parameters) {
            try {
                const req = await database_1.pool.query(Queries.Account.Select(parameters));
                return req.rows[0];
            }
            catch (err) {
                throw err;
            }
        }
        Account.select = select;
        ;
    })(Account = Repository.Account || (Repository.Account = {}));
})(Repository || (exports.Repository = Repository = {}));
;
//Esse namespace define os tipos dos parametros que devem ser enviados para a execução das queries
var Parameters;
(function (Parameters) {
    let Account;
    (function (Account) {
        ;
        ;
        ;
    })(Account = Parameters.Account || (Parameters.Account = {}));
})(Parameters || (exports.Parameters = Parameters = {}));
;
