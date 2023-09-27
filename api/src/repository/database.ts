import { Pool } from "pg";
import * as dotenv from 'dotenv';

dotenv.config();
// Cria o objeto para estabelecer conexão com o banco de dados
export const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASS,
  port: Number(process.env.PG_PORT),
});