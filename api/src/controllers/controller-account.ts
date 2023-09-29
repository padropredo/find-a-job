import { Repository } from '../repository/repository-account';
import { Router } from 'express';

export const router = Router();

router.post('/account', async (req, res) => {
    try{
        const response = await Repository.Account.create(req.body);
        res.status(200).send(response);
    }catch(error){
        res.status(500).send(error);
    } 
});

router.delete('/account', (req, res) => {
    try{
        Repository.Account.remove({id: Number(req.query.id)});
        res.sendStatus(200);
    }catch(error){
        res.status(500).send(error);

    }
});

//Define a rota para listar elementos do banco
router.get('/account', async (req, res) => {
   
    try{
        const response = await Repository.Account.select({email: req.query.email!.toString()});
        res.status(200).send(response);
    }catch(error){
        res.status(500).send(error);

    } 
});