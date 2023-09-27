import { pool } from "./database";
import {JobOffer_Status, JobOffer_Type } from "../utils/enums";

//Define os comandos para serem executados no banco de dados
const Queries = {
    
  JobOffer: {
    
    // Função para gerar query para listar os itens
    Select(parameters: Parameters.JobOffer.Select) {
      let index = 1;
      let values = [];
      let query = '';
      if(parameters.id !== undefined){
        query += ` id = ANY($${index++}::int[]) AND`;
        values.push(parameters.id);
      }
      if(parameters.accountId !== undefined){
        query += ` Account_id = ANY($${index++}::int[]) AND`;
        values.push(parameters.accountId);
      }
      if(parameters.type !== undefined){
        query += ` type = ANY($${index++}::int[]) AND`;
        values.push(parameters.type);
      }
      if(parameters.status !== undefined){
        query += ` status = ANY($${index++}::int[]) AND`;
        values.push(parameters.status);
      }
      if(query != ''){
        query = ' WHERE' + query.slice(0,-3);
      }
      values.push(parameters.size);
      values.push(parameters.page);
      
      return ({
        text: 'SELECT * FROM JobOffer' + query +` ORDER BY id LIMIT $${index++} OFFSET (($${index} - 1 ) * $${index-1});`,
        values: values,
      });
    },

    // Função para gerar query para inserir novos itens
    Create(parameters: Parameters.JobOffer.Create) {
      return ({
        text: 'INSERT INTO JobOffer (Account_id, type, status, title, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        values: [parameters.accountId, parameters.type, parameters.status, parameters.title, parameters.description],
      });
    },

    // Função para gerar query para deletar um ou mais itens
    Remove(parameters: Parameters.JobOffer.Remove) {
      return ({
        text: 'DELETE FROM JobOffer WHERE id = ANY($1::int[])',
        values: [parameters.id],
      });
    },

    // Função para alterar itens
    Update(parameters: Parameters.JobOffer.Update) {
      let index = 1;
      let values = [];
      let query = '';
      if(parameters.type !== undefined){
        query += ` type = $${index++},`;
        values.push(parameters.type);
      }
      if(parameters.status !== undefined){
        query += ` status = $${index++},`;
        values.push(parameters.status);
      }
      if(parameters.title !== undefined){
        query += ` title = $${index++},`;
        values.push(parameters.title);
      }
      if(parameters.description !== undefined){
        query += ` description = $${index++},`;
        values.push(parameters.description);
      }
      query += ` update_time = $${index++}`
      
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
export namespace Repository {

  export namespace JobOffer {

    export async function create(parameters: Parameters.JobOffer.Create) {
      try {
        const req = await pool.query(Queries.JobOffer.Create(parameters));
        return req.rows[0];
      } catch (err) {
        throw err;
      };
    };

    export async function remove(parameters: Parameters.JobOffer.Remove) {
      try {
        const req = await pool.query(Queries.JobOffer.Remove(parameters));
        return req.rows[0];
      } catch (err) {
        throw err;
      };
    };

    export async function update(parameters: Parameters.JobOffer.Update) {
      try {
        const query = Queries.JobOffer.Update(parameters);
        console.log(query.text)
        const req = await pool.query(query);
        return req.rows[0];
      } catch (err) {
        throw err;
      };
    };

    export async function select(parameters: Parameters.JobOffer.Select) {
      try {
        const query = Queries.JobOffer.Select(parameters);
        console.log(query)
        const req = await pool.query(query);
        return req.rows;
      } catch (err) {
        throw err;
      };
    };
  }

};

// Define os tipos dos parametros que devem ser enviados para a execução das queries
export namespace Parameters {

  export namespace JobOffer {

    export interface Create {
      accountId: string,
      type: Array<JobOffer_Type>,
      status: Array<JobOffer_Status>,
      title?: string,
      description?: string
    };

    export interface Remove {
      id: Array<number>,
    };

    export interface Update {
      id: number
      type?: JobOffer_Type,
      status?: JobOffer_Status,
      title?: string,
      description?: string
    };

    export interface Select {
      id?: Array<number>,
      accountId? : Array<number>, 
      type?: Array<JobOffer_Type>,
      status?: Array<JobOffer_Status>,
      size: number,
      page: number,
    };

  }
};
