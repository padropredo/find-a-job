"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameters = exports.Repository = void 0;
const database_1 = require("./database");
//Define os comandos para serem executados no banco de dados
const Queries = {
    JobOffer: {
        // Função para gerar query para listar os itens
        Select(parameters) {
            let index = 1;
            let values = [];
            let query = '';
            if (parameters.id !== undefined) {
                query += ` id = ANY($${index++}::int[]) AND`;
                values.push(parameters.id);
            }
            if (parameters.accountId !== undefined) {
                query += ` Account_id = ANY($${index++}::int[]) AND`;
                values.push(parameters.accountId);
            }
            if (parameters.type !== undefined) {
                query += ` type = ANY($${index++}::int[]) AND`;
                values.push(parameters.type);
            }
            if (parameters.status !== undefined) {
                query += ` status = ANY($${index++}::int[]) AND`;
                values.push(parameters.status);
            }
            if (query != '') {
                query = ' WHERE' + query.slice(0, -3);
            }
            values.push(parameters.size);
            values.push(parameters.page);
            return ({
                text: 'SELECT * FROM JobOffer' + query + ` ORDER BY id LIMIT $${index++} OFFSET (($${index} - 1 ) * $${index - 1});`,
                values: values,
            });
        },
        // Função para gerar query para inserir novos itens
        Create(parameters) {
            return ({
                text: 'INSERT INTO JobOffer (Account_id, type, status, title, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                values: [parameters.accountId, parameters.type, parameters.status, parameters.title, parameters.description],
            });
        },
        // Função para gerar query para deletar um ou mais itens
        Remove(parameters) {
            return ({
                text: 'DELETE FROM JobOffer WHERE id = ANY($1::int[])',
                values: [parameters.id],
            });
        },
        // Função para alterar itens
        Update(parameters) {
            let index = 1;
            let values = [];
            let query = '';
            if (parameters.type !== undefined) {
                query += ` type = $${index++},`;
                values.push(parameters.type);
            }
            if (parameters.status !== undefined) {
                query += ` status = $${index++},`;
                values.push(parameters.status);
            }
            if (parameters.title !== undefined) {
                query += ` title = $${index++},`;
                values.push(parameters.title);
            }
            if (parameters.description !== undefined) {
                query += ` description = $${index++},`;
                values.push(parameters.description);
            }
            query += ` update_time = $${index++}`;
            values.push(new Date());
            values.push(parameters.id);
            return ({
                text: 'UPDATE JobOffer SET ' + query + ` WHERE id = $${index} RETURNING *`,
                values: values,
            });
        }
    },
};
// Esse namespace exporta as funções que chamam a execução das queries
var Repository;
(function (Repository) {
    let JobOffer;
    (function (JobOffer) {
        async function create(parameters) {
            try {
                const req = await database_1.pool.query(Queries.JobOffer.Create(parameters));
                return req.rows[0];
            }
            catch (err) {
                throw err;
            }
            ;
        }
        JobOffer.create = create;
        ;
        async function remove(parameters) {
            try {
                const req = await database_1.pool.query(Queries.JobOffer.Remove(parameters));
                return req.rows[0];
            }
            catch (err) {
                throw err;
            }
            ;
        }
        JobOffer.remove = remove;
        ;
        async function update(parameters) {
            try {
                const query = Queries.JobOffer.Update(parameters);
                console.log(query.text);
                const req = await database_1.pool.query(query);
                return req.rows[0];
            }
            catch (err) {
                throw err;
            }
            ;
        }
        JobOffer.update = update;
        ;
        async function select(parameters) {
            try {
                const query = Queries.JobOffer.Select(parameters);
                console.log(query);
                const req = await database_1.pool.query(query);
                return req.rows;
            }
            catch (err) {
                throw err;
            }
            ;
        }
        JobOffer.select = select;
        ;
    })(JobOffer = Repository.JobOffer || (Repository.JobOffer = {}));
})(Repository || (exports.Repository = Repository = {}));
;
// Define os tipos dos parametros que devem ser enviados para a execução das queries
var Parameters;
(function (Parameters) {
    let JobOffer;
    (function (JobOffer) {
        ;
        ;
        ;
        ;
    })(JobOffer = Parameters.JobOffer || (Parameters.JobOffer = {}));
})(Parameters || (exports.Parameters = Parameters = {}));
;
