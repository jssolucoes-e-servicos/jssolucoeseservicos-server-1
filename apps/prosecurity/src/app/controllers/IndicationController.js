const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Indication = require('../models/v1_Indication');
const router = express.Router();
//router.use(authMiddleware)
router.post('/', async (req, res) => {
    try { 
        const indication = await Indication.create(req.body);
        req.io.emit('indication', indication);
        return res.send(indication);
    } catch (error) {
       res.status(400).send({ error: 'Falha ao inserir indicação' }); 
    }
});
router.put('/update/:id', async (req, res) => {
    try { 
        const indication = await Indication.update(req.params.id, req.body);
        return res.send(indication);
    } catch (error) {
       res.status(400).send({ error: 'Falha ao atualizar a indicação' }); 
    }
});
router.get('/list', async (req, res ) => {
    try {
        const { page = 1 } = req.query;
        const indication = await Indication.paginate({},{populate: 'User Product',page, limit:25});
        res.send(indication);
    } catch (error) {
        res.status(400).send({ error: 'Falha ao carregar as indicações' });
    }
});
router.get('/:id', async (req, res ) => {
    try {
       const indication = await Indication.findById(req.params.id).populate({ path: "User Product"});
       res.send(indication);  
    } catch (error) {
        res.status(400).send({ error: 'Falha ao carregar Indicação' });
    }
       
});
module.exports = app => app.use('/prosecurity/indication', router);