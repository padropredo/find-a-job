import { Repository } from '../repository/repository-jobapplication';
import { Router } from 'express';

export const router = Router();

//Define a rota para inserir um elemento no banco
router.post('/jobapplication', async (req, res) => {
    const createBody = req.body;
    try{
        const response = await Repository.JobApplication.create(createBody);
        res.status(200).send(response);
    }catch(error){
        console.log(error)
        res.status(500).send(error);

    } 
});

//Define a rota para eliminar um ou mais elementos no banco
router.delete('/jobapplication', async (req, res) => {
    
    const idArray = req.query.id?.toString().split(',').map(Number);
    try{
        await Repository.JobApplication.remove({id: idArray!});
        res.sendStatus(200);
    }catch(error){
        res.status(500).send(error);

    } 
});

//Define a rota para alterar um elemento no banco
router.put('/jobapplication', async (req, res) => {
    try{
        const updateBody = req.body;
        updateBody.id = Number(req.query.id);
        const response = await Repository.JobApplication.update(updateBody);
        res.status(200).send(response);
    }catch(error){
        console.log(error)
        res.status(500).send(error);

    } 
});

//Define a rota para listar elementos do banco
router.get('/jobapplication', async (req, res) => {
    const getBody = {
        id: req.query.id?.toString().split(',').map(Number),
        candidateProfileId:req.query.candidateProfileId?.toString().split(',').map(Number),
        jobOfferId: req.query.jobOfferId?.toString().split(',').map(Number),
        size: Number(req.query.size),
        page: Number(req.query.page)
    };
    try{
        const response = await Repository.JobApplication.select(getBody);
        res.status(200).send(response);
    }catch(error){
        res.status(500).send(error);

    } 
});