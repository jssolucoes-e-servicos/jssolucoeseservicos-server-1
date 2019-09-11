const express = require('express');
const Contributor = require('../models/Contributor');
const Customer = require('../models/Customer');
const Panic = require('../models/Panic');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
//router.use(authMiddleware);
router.post('/insert', async (req, res) => {
    try {
        const panic = await Panic.create(req.body);
        ioPanic = await Panic.findById(panic._id).populate({
            path: "UserRequest UserResponse",
          });
        req.io.emit('v1_panic', ioPanic);
   //     let user = User.findById(req.body.UserRequest);
   //     user.InPanic = 'true';
  //      user.save();
        return res.send(panic);
        
    } catch (error) {
      res.status(400).send({ error: 'Falha ao inserir emergência' }); 
    }
});

router.post('/close', async (req, res) => {
    try {
        let customer = await Customer.findById(req.body.UserRequest);
        customer.InPanic = 'false';
        customer.save();
        let panic = await Panic.findById(req.body._id);
        panic.UserResponse = req.body.UserResponse;
        panic.Ocorrency = req.body.Ocorrency;
        panic.Closed = 'true';
        panic.save()
        req.io.emit('v1_panic', panic);
        return res.send(panic);
    } catch (error) {
        console.log(error);
       res.status(400).send({ error: 'Falha ao fechar emergência'}); 
    }
});
router.post('/update', async (req, res) => {
    try {
        let panic = await Panic.findById(req.body._id);
        panic.UserRequest = req.body.UserRequest;
        panic.UserResponse = req.body.UserResponse;
        panic.Ocorrency = req.body.Ocorrency;
        panic.Lat = req.body.Lat;
        panic.Long = req.body.Long;
        panic.Observation = req.body.Observation;
        panic.Closed = req.body.Closed;
        panic.save()
        return res.send(panic);
    } catch (error) {
       res.status(400).send({ error: 'Falha ao atualizar emergência'}); 
    }
});
router.get('/list', async (req, res ) => {
    try {
        const { page = 1 } = req.query;
        const panic = await Panic.paginate({},{
            populate: 'UserRequest UserResponse',
            sort:{
                createdAt: -1
            },
            page,
            limit:25
        })
        res.send(panic);
    } catch (error) {
        res.status(400).send({ error: 'Falha ao listar emergências' });
    }
});
router.get('/:id', async (req, res ) => {
    try {
       const panic = await Panic.findById(req.params.id).populate({
         path: "UserRequest UserResponse",
       });
       res.send(panic);  
    } catch (error) {
        res.status(400).send({ error: 'Falha ao carregar  emergência' });
    }  
});

module.exports = app => app.use('/prosecurity/panic', router);