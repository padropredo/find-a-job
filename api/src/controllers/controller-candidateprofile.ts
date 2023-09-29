import { Repository } from '../repository/repository-candidateprofile';
import { Router } from 'express';

export const router = Router();

//Define a rota para inserir um elemento no banco
router.post('/candidateprofile/:accountId', async (req, res) => {
    const createBody = req.body;
    createBody.accountId = Number(req.params.accountId);
    try{
        const response = await Repository.CandidateProfile.create(createBody);
        res.status(200).send(response);
    }catch(error){
        res.status(500).send(error);

    } 
});

//Define a rota para eliminar um ou mais elementos no banco
router.delete('/candidateprofile', async (req, res) => {
    
    const idArray = req.query.id?.toString().split(',').map(Number);
    try{
        await Repository.CandidateProfile.remove({id: idArray!});
        res.sendStatus(200);
    }catch(error){
        res.status(500).send(error);

    } 
});

//Define a rota para alterar um elemento no banco
router.put('/candidateprofile', async (req, res) => {
    try{
        const updateBody = req.body;
        updateBody.id = Number(req.query.id);
        const response = await Repository.CandidateProfile.update(updateBody);
        res.status(200).send(response);
    }catch(error){
        console.log(error)
        res.status(500).send(error);

    } 
});

//Define a rota para listar elementos do banco
router.get('/candidateprofile', async (req, res) => {
    const getBody = {
        id: req.query.id?.toString().split(',').map(Number),
        accountId: req.query.accountId?.toString().split(',').map(Number),
        size: Number(req.query.size),
        page: Number(req.query.page)
    };
    try{
        const response = await Repository.CandidateProfile.select(getBody);
        res.status(200).send(response);
    }catch(error){
        res.status(500).send(error);

    } 
});