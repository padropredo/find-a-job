"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameters = exports.Repository = void 0;
const database_1 = require("./database");
//Define os comandos para serem executados no banco de dados
const Queries = {
    JobApplication: {
        // Função para gerar query para listar os itens
        Select(parameters) {
            let index = 1;
            let values = [];
            let query = '';
            if (parameters.id !== undefined) {
                query += ` id = ANY($${index++}::int[]) AND`;
                values.push(parameters.id);
            }
            if (parameters.candidateProfileId !== undefined) {
                query += ` CandidateProfile_id = ANY($${index++}::int[]) AND`;
                values.push(parameters.candidateProfileId);
            }
            if (parameters.jobOfferId !== undefined) {
                query += ` JobOffer_id = ANY($${index++}::int[]) AND`;
                values.push(parameters.jobOfferId);
            }
            if (query != '') {
                query = ' WHERE' + query.slice(0, -3);
            }
            values.push(parameters.size);
            values.push(parameters.page);
            return ({
                text: 'SELECT * FROM JobApplication' + query + ` ORDER BY id LIMIT $${index++} OFFSET (($${index} - 1 ) * $${index - 1});`,
                values: values,
            });
        },
        // Função para gerar query para inserir novos itens
        Create(parameters) {
            return ({
                text: 'INSERT INTO JobApplication (CandidateProfile_id, JobOffer_id) VALUES ($1, $2) RETURNING *',
                values: [parameters.candidateProfileId, parameters.jobOfferId],
            });
        },
        // Função para gerar query para deletar um ou mais itens
        Remove(parameters) {
            return ({
                text: 'DELETE FROM JobApplication WHERE id = ANY($1::int[])',
                values: [parameters.id],
            });
        },
        // Função para alterar itens
        Update(parameters) {
            let index = 1;
            let values = [];
            let query = '';
            if (parameters.candidateProfileId !== undefined) {
                query += ` candidateProfile_Id = $${index++},`;
                values.push(parameters.candidateProfileId);
            }
            if (parameters.jobOfferId !== undefined) {
                query += ` jobOffer_Id = $${index++},`;
                values.push(parameters.jobOfferId);
            }
            query += ` update_time = $${index++}`;
            values.push(new Date());
            values.push(parameters.id);
            return ({
                text: 'UPDATE JobApplication SET ' + query + ` WHERE id = $${index} RETURNING *`,
                values: values,
            });
        }
    },
};
// Esse namespace exporta as funções que chamam a execução das queries
var Repository;
(function (Repository) {
    let JobApplication;
    (function (JobApplication) {
        async function create(parameters) {
            try {
                const req = await database_1.pool.query(Queries.JobApplication.Create(parameters));
                return req.rows[0];
            }
            catch (err) {
                throw err;
            }
            ;
        }
        JobApplication.create = create;
        ;
        async function remove(parameters) {
            try {
                const req = await database_1.pool.query(Queries.JobApplication.Remove(parameters));
                return req.rows[0];
            }
            catch (err) {
                throw err;
            }
            ;
        }
        JobApplication.remove = remove;
        ;
        async function update(parameters) {
            try {
                const query = Queries.JobApplication.Update(parameters);
                console.log(query.text);
                const req = await database_1.pool.query(query);
                return req.rows[0];
            }
            catch (err) {
                throw err;
            }
            ;
        }
        JobApplication.update = update;
        ;
        async function select(parameters) {
            try {
                const query = Queries.JobApplication.Select(parameters);
                console.log(query);
                const req = await database_1.pool.query(query);
                return req.rows;
            }
            catch (err) {
                throw err;
            }
            ;
        }
        JobApplication.select = select;
        ;
    })(JobApplication = Repository.JobApplication || (Repository.JobApplication = {}));
})(Repository || (exports.Repository = Repository = {}));
;
// Define os tipos dos parametros que devem ser enviados para a execução das queries
var Parameters;
(function (Parameters) {
    let JobApplication;
    (function (JobApplication) {
        ;
        ;
        ;
        ;
    })(JobApplication = Parameters.JobApplication || (Parameters.JobApplication = {}));
})(Parameters || (exports.Parameters = Parameters = {}));
;
