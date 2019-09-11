const express = require('express');
const User = require('../models/User');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('./../../config/auth');
const mailer = require('../../modules/mailer');
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

router.post('/forgot-password', async (req, res) =>{
    const { Mail } = req.body;
    try {
        const user = Customer.findOne( { Mail } );
        if (!user)
            res.status(400).send({ error : 'Usuário não encontrado!' }); 
        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 1);
        await User.findByIdAndUpdate(user.id, {
           '$set': {
                PasswordResetToken: token,
                PasswordResetExpires: now
           } 
        });
        let mail = await mailer.sendMail({
            to: Email,
            from: 'no-replay@apps.jssolucoeseservicos.com.br',
            template: 'auth/forgot_password',
            context: { token }
        }, (err) => {
            if (err)
                return res.status(400).send({ error: 'Cannot send forgot password email'});
            return res.send();
        });
    } catch (err){
        res.status(400).send({ error : 'Error on forgot password, try again' });
    }
});

module.exports = app => app.use('/conselho-cic/auth', router);