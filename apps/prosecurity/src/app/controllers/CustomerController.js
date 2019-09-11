const express = require('express');
const Customer = require('./../models/Customer');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path'); 
const fs = require('fs'); 
const uploadsConfig = require('../../config/multer');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
//router.use(authMiddleware);
const upload = multer(uploadsConfig);
router.get('/list', async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const customer = await Customer.paginate({},{
            page,
            limit: 25
        })
        res.send(customer);
    } catch (error) {
        res.status(400).send({
            error: 'Falha ao listar Clientes'
        });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.send(customer);
    } catch (error) {
        res.status(400).send({
            error: 'Falha ao carregar dados'
        });
    }
});

router.post('/set-panic', async (req, res) =>{
  try {
      const { _id } = req.body;
      const customer = await Customer.findOne({_id: _id});
      customer.InPanic = 'true';
      customer.save();
      res.send(customer);
  } catch (error) {
    res.status(400).send({ error: 'Falha ao colocar em pânico' }); 
  }  
});

router.post('/change-password', async (req, res) =>{
    try {
        const { _id, Password, NewPassword } = req.body;
        const customer = await Customer.findOne({_id: _id});
        customer.Password = NewPassword;
        customer.save();
        res.send(customer);
    } catch (error) {
      res.status(400).send({ error: 'Falha ao alterar a senha' }); 
    }  
  });


router.post('/insert-photo', upload.single('Photo'), async (req, res) => {
    try {
        const { _id } = req.body;
        const { filename: Photo } = req.file;
        const [name ] = Photo.split('.');
        const fileName = `${name}.jpg`;
        await sharp(req.file.path)
            .resize(300)
            .jpeg({ quality: 60 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )
            fs.unlinkSync(req.file.path);
        let customer = await Customer.findById(_id);
        customer.Photo = `https://projetojesus-backend.herokuapp.com/prosecurity/files/${fileName}`;
        await customer.save();
        res.send(customer);
    } catch (error) {
        res.status(400).send({ error: 'Falha ao inserir a foto' }); 
    }
});
router.post('/:id/change-password', async (req, res) => {
    try {
        let {
            Password,
            NewPassword
        } = req.body;
        let customer = await Customer.findById(req.params.id).select('+Password');
        if (!await bcrypt.compare(Password, customer.Password))
            return res.status(400).send({
                "error": "Senha Inválida!"
            });
        const hash = await bcrypt.hash(NewPassword, 10);
        Password = hash;
        customer = await Customer.findByIdAndUpdate(req.params.id, {
            Password
        });
        customer.Password = undefined;
        res.send({
            customer
        });
    } catch (error) {
        res.status(400).send({
            error: 'Senha não alterada!'
        });
    }
});
module.exports = app => app.use('/prosecurity/customer', router);