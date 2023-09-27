"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameters = exports.Repository = void 0;
const database_1 = require("./database");
//Define os comandos para serem executados no banco de dados
const Queries = {
    CandidateProfile: {
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
            if (query != '') {
                query = ' WHERE' + query.slice(0, -3);
            }
            values.push(parameters.size);
            values.push(parameters.page);
            return ({
                text: 'SELECT * FROM CandidateProfile' + query + ` ORDER BY id LIMIT $${index++} OFFSET (($${index} - 1 ) * $${index - 1});`,
                values: values,
            });
        },
        // Função para gerar query para inserir novos itens
        Create(parameters) {
            return ({
                text: 'INSERT INTO CandidateProfile (Account_id, name, experiences) VALUES ($1, $2, $3) RETURNING *',
                values: [parameters.accountId, parameters.name, parameters.experiences],
            });
        },
        // Função para gerar query para deletar um ou mais itens
        Remove(parameters) {
            return ({
                text: 'DELETE FROM CandidateProfile WHERE id = ANY($1::int[])',
                values: [parameters.id],
            });
        },
        // Função para alterar itens
        Update(parameters) {
            let index = 1;
            let values = [];
            let query = '';
            if (parameters.name !== undefined) {
                query += ` name = $${index++},`;
                values.push(parameters.name);
            }
            if (parameters.experiences !== undefined) {
                query += ` experiences = $${index++},`;
                values.push(parameters.experiences);
            }
            query += ` update_time = $${index++}`;
            values.push(new Date());
            values.push(parameters.id);
            return ({
                text: 'UPDATE CandidateProfile SET ' + query + ` WHERE id = $${index} RETURNING *`,
                values: values,
            });
        }
    },
};
// Esse namespace exporta as funções que chamam a execução das queries
var Repository;
(function (Repository) {
    let CandidateProfile;
    (function (CandidateProfile) {
        async function create(parameters) {
            try {
                const req = await database_1.pool.query(Queries.CandidateProfile.Create(parameters));
                return req.rows[0];
            }
            catch (err) {
                throw err;
            }
            ;
        }
        CandidateProfile.create = create;
        ;
        async function remove(parameters) {
            try {
                const req = await database_1.pool.query(Queries.CandidateProfile.Remove(parameters));
                return req.rows[0];
            }
            catch (err) {
                throw err;
            }
            ;
        }
        CandidateProfile.remove = remove;
        ;
        async function update(parameters) {
            try {
                const query = Queries.CandidateProfile.Update(parameters);
                console.log(query.text);
                const req = await database_1.pool.query(query);
                return req.rows[0];
            }
            catch (err) {
                throw err;
            }
            ;
        }
        CandidateProfile.update = update;
        ;
        async function select(parameters) {
            try {
                const query = Queries.CandidateProfile.Select(parameters);
                console.log(query.text);
                const req = await database_1.pool.query(query);
                return req.rows;
            }
            catch (err) {
                throw err;
            }
            ;
        }
        CandidateProfile.select = select;
        ;
    })(CandidateProfile = Repository.CandidateProfile || (Repository.CandidateProfile = {}));
})(Repository || (exports.Repository = Repository = {}));
;
// Define os tipos dos parametros que devem ser enviados para a execução das queries
var Parameters;
(function (Parameters) {
    let CandidateProfile;
    (function (CandidateProfile) {
        ;
        ;
        ;
        ;
    })(CandidateProfile = Parameters.CandidateProfile || (Parameters.CandidateProfile = {}));
})(Parameters || (exports.Parameters = Parameters = {}));
;
