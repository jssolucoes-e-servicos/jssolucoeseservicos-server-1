const express = require('express');
const Group = require('./../models/ConselhoCIC_Group');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
router.use(authMiddleware);
router.post('/store', async (req, res) => {
    try {
        const group = await Group.create(req.body);
        const data = {
          docs: group
        } 
        return res.send(data);
    } catch (error) {
        res.status(400).send({ error : "Falha ao cadastrar Grupo", catch: error });
    }
});
router.get('/list', async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const groups = await Group.paginate({},{
            page,
            limit: 25
        })
        res.send(groups);
    } catch (error) {
        res.status(400).send({
            error: 'Falha ao listar grupos',
            catch: error
        });
    }
});
router.get('/show/:id', async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        const data = {
            docs: group
        }
        res.send(data);
    } catch (error) {
        res.status(400).send({
            error: 'Falha ao carregar dados',
            catch: error
        });
    }
});
module.exports = app => app.use('/conselho-cic/groups', router);