import * as dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import { router as JobOfferRouter} from './controllers/controller-joboffer';
import { router as AccountOfferRouter} from './controllers/controller-account';
import { router as CandidateProfileRouter} from './controllers/controller-candidateprofile';
import { router as ApplicationRouter} from './controllers/controller-jobapplication';



//Permite o uso de variaveis de ambiente atraves da lib dotenv
dotenv.config();

//Inicializa a aplicacao express
const app = express();
app.use(express.json());
app.use(cors());

//Determina a porta onde a API irá escutar
const port = process.env.API_PORT;

app.listen(port , () => console.log(`Listening on port ${port}`));

//Adiciona as rotas definidas a aplicação
app.use(JobOfferRouter)
app.use(AccountOfferRouter)
app.use(CandidateProfileRouter)
app.use(ApplicationRouter)



