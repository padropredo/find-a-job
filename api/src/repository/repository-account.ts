import { pool } from "./database";

import { Account_Type } from "../utils/enums";

//Define os comandos para serem executados no banco de dados
const Queries = {

  Account: {

    Select(parameters: Parameters.Account.Select) {
      return ({
        text: 'SELECT * FROM Account WHERE email = $1',
        values: [parameters.email],
      });
    },

    // Função para gerar query para inserir novos itens
    Create(parameters: Parameters.Account.Create) {
      return ({
        text: 'INSERT INTO Account (email, password, type) VALUES ($1, $2, $3) RETURNING *',
        values: [parameters.email, parameters.password, parameters.type],
      });
    },

    // Função para gerar query para deletar um ou mais itens
    Remove(parameters: Parameters.Account.Remove) {
      return ({
        text: 'DELETE FROM Account WHERE id = $1',
        values: [parameters.id],
      });
    }
  },
};

// Esse namespace exporta as funções que chamam a execução das queries
export namespace Repository {

  export namespace Account {

    export async function create(parameters: Parameters.Account.Create) {
      try {
        const req = await pool.query(Queries.Account.Create(parameters));
        return req.rows[0];
      } catch (err) {
        throw err;
      }
    };

    export async function remove(parameters: Parameters.Account.Remove) {
      try {
        const req = await pool.query(Queries.Account.Remove(parameters));
        return req.rows[0];
      } catch (err) {
        throw err;
      }
    };

    export async function select(parameters: Parameters.Account.Select) {
      try {
        const req = await pool.query(Queries.Account.Select(parameters));
        return req.rows[0];
      } catch (err) {
        throw err;
      }
    };
  }

};

//Esse namespace define os tipos dos parametros que devem ser enviados para a execução das queries
export namespace Parameters {

  export namespace Account {

    export interface Create {
      email: string,
      password: string,
      type: Account_Type
    };

    export interface Remove {
      id: number,
    };

    export interface Select {
      email: string,
    };

  }
};
