const express = require('express');
const User = require('./../models/User');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
router.use(authMiddleware);
router.post('/store', async (req, res) => {
    const { Email } = req.body;
    try {
        if ( await User.findOne( { Email }))
            return res.status(400).send({ error: "Usuário já cadastrado" });
        const user = await User.create(req.body);
        user.Password = undefined;  
        return res.send(user);
    } catch (error) {
        res.status(400).send({ error : "Falha ao cadastrar administrador", catch: error });
    }
});
router.get('/list', async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const user = await User.paginate({},{
            page,
            limit: 25
        })
        res.send(user);
    } catch (error) {
        res.status(400).send({
            error: 'Falha ao listar Clientes',
            catch: error
        });
    }
});
router.get('/show/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const data = {
            docs: user
        }
        res.send(data);
    } catch (error) {
        res.status(400).send({
            error: 'Falha ao carregar dados',
            catch: error
        });
    }
});

router.post('/set-panic', async (req, res) =>{
  try {
      const { _id } = req.body;
      const user = await User.findOne({_id: _id});
      user.InPanic = 'true';
      user.save();
      const data = {
          docs: user
      }
      res.send(data);
  } catch (error) {
    res.status(400).send({ error: 'Falha ao colocar em pânico', catch: error }); 
  }  
});

router.post('/change-password/:id', async (req, res) => {
    try {
        const {
            Password,
            NewPassword
        } = req.body;
        const user = await User.findById(req.params.id).select('+Password');
        if (!await bcrypt.compare(Password, user.Password))
            return res.status(400).send({
                "error": "Senha Inválida!"
            });
        const hash = await bcrypt.hash(NewPassword, 10);
        Password = hash;
        user = await User.findByIdAndUpdate(req.params.id, {
            Password
        });
        user.Password = undefined;
        const data = {
            docs: user
        }
        res.send({data});
    } catch (error) {
        res.status(400).send({
            error: 'Senha não alterada!',
            catch: error
        });
    }
});
module.exports = app => app.use('/conselho-cic/user', router);