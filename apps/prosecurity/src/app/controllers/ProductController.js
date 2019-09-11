const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Product = require('../models/ProSecurity_Product');
const router = express.Router();
//router.use(authMiddleware)
router.post('/', async (req, res) => {
    try { 
        const product = await Product.create(req.body);
        req.io.emit('product', product);
        return res.send(product);
    } catch (error) {
       res.status(400).send({ error: 'Falha ao salvar Produto' }); 
    }
});
router.put('/update/:id', async (req, res) => {
    try { 
        const product = await Product.update(req.params.id, req.body);
        req.io.emit('product', product);
        return res.send(response);
    } catch (error) {
       res.status(400).send({ error: 'Falha ao alterar produto' }); 
    }
});
router.get('/list', async (req, res ) => {
    try {
        const { page = 1 } = req.query;
        const product = await Product.paginate({},{page, limit:25})
        res.send(product);
    } catch (error) {
        res.status(400).send({ error: 'Falha ao carregar produtos' });
    }
});
router.get('/:id', async (req, res ) => {
    try {
       const product = await Product.findById(req.params.id);
       res.send(product);  
    } catch (error) {
        res.status(400).send({ error: 'Falha ao carregar produto' });
    }
       
});
module.exports = app => app.use('/prosecurity/product', router);