import { pool } from "./database";
import {JobOffer_Status, JobOffer_Type } from "../utils/enums";

//Define os comandos para serem executados no banco de dados
const Queries = {
    
  JobApplication: {
    
    // Função para gerar query para listar os itens
    Select(parameters: Parameters.JobApplication.Select) {
      let index = 1;
      let values = [];
      let query = '';
      if(parameters.id !== undefined){
        query += ` id = ANY($${index++}::int[]) AND`;
        values.push(parameters.id);
      }
      if(parameters.candidateProfileId !== undefined){
        query += ` CandidateProfile_id = ANY($${index++}::int[]) AND`;
        values.push(parameters.candidateProfileId);
      }
      if(parameters.jobOfferId !== undefined){
        query += ` JobOffer_id = ANY($${index++}::int[]) AND`;
        values.push(parameters.jobOfferId);
      }
      if(query != ''){
        query = ' WHERE' + query.slice(0,-3);
      }
      values.push(parameters.size);
      values.push(parameters.page);
      
      return ({
        text: 'SELECT * FROM JobApplication' + query +` ORDER BY id LIMIT $${index++} OFFSET (($${index} - 1 ) * $${index-1});`,
        values: values,
      });
    },

    // Função para gerar query para inserir novos itens
    Create(parameters: Parameters.JobApplication.Create) {
      return ({
        text: 'INSERT INTO JobApplication (CandidateProfile_id, JobOffer_id) VALUES ($1, $2) RETURNING *',
        values: [parameters.candidateProfileId, parameters.jobOfferId],
      });
    },

    // Função para gerar query para deletar um ou mais itens
    Remove(parameters: Parameters.JobApplication.Remove) {
      return ({
        text: 'DELETE FROM JobApplication WHERE id = ANY($1::int[])',
        values: [parameters.id],
      });
    },

    // Função para alterar itens
    Update(parameters: Parameters.JobApplication.Update) {
      let index = 1;
      let values = [];
      let query = '';
      if(parameters.candidateProfileId !== undefined){
        query += ` candidateProfile_Id = $${index++},`;
        values.push(parameters.candidateProfileId);
      }
      if(parameters.jobOfferId !== undefined){
        query += ` jobOffer_Id = $${index++},`;
        values.push(parameters.jobOfferId);
      }
      query += ` update_time = $${index++}`
      
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
export namespace Repository {

  export namespace JobApplication {

    export async function create(parameters: Parameters.JobApplication.Create) {
      try {
        const req = await pool.query(Queries.JobApplication.Create(parameters));
        return req.rows[0];
      } catch (err) {
        throw err;
      };
    };

    export async function remove(parameters: Parameters.JobApplication.Remove) {
      try {
        const req = await pool.query(Queries.JobApplication.Remove(parameters));
        return req.rows[0];
      } catch (err) {
        throw err;
      };
    };

    export async function update(parameters: Parameters.JobApplication.Update) {
      try {
        const query = Queries.JobApplication.Update(parameters);
        console.log(query.text)
        const req = await pool.query(query);
        return req.rows[0];
      } catch (err) {
        throw err;
      };
    };

    export async function select(parameters: Parameters.JobApplication.Select) {
      try {
        const query = Queries.JobApplication.Select(parameters);
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

  export namespace JobApplication {

    export interface Create {
      candidateProfileId: number,
      jobOfferId: number
    };

    export interface Remove {
      id: Array<number>,
    };

    export interface Update {
      id: number
      candidateProfileId: number,
      jobOfferId: number
    };

    export interface Select {
      id?: Array<number>,
      candidateProfileId?: Array<number>,
      jobOfferId?: Array<number>,
      size: number,
      page: number
    };

  }
};
