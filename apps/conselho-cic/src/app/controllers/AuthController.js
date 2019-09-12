const express = require('express');
const User = require('../models/ConselhoCIC_User');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('./../../config/auth');
const router = express.Router();

router.post('/store', async (req, res) => {
    const { Mail } = req.body;
    try {
        if ( await User.findOne( { Mail }))
            return res.status(400).send({ error: "Administrador já cadastrado" });
        const user = await User.create(req.body);
        user.Password = undefined;  
        return res.send(user);
    } catch (error) {
        res.status(400).send({ error : "Falha ao cadastrar administrador", catch: error });
    }
});

router.post('/authenticate', async (req, res) => {
    const { Mail, Password } = req.body;
    const user = await User.findOne({ Mail }).select('+Password');
    if(!user)
        return res.status(400).send({ "error" : "usuário não encontrado!"}); 
    if(!await bcrypt.compare(Password, user.Password))
        return res.status(400).send({ "error" : "Accesso negado!"});
    user.Password = undefined;
    const token = jwt.sign({ id: user._id }, authConfig.secret, {
        expiresIn: 86400,
    });
    const session = user._id;
    
    const result = {
        user , 
        token ,
        session,
    };
    console.log(result);
    return res.send( result ); 
});

module.exports = app => app.use('/conselho-cic/auth', router);