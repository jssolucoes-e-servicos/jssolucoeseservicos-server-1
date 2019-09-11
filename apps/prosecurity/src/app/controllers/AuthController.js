const express = require('express');
const Customer = require('../models/Customer');
const Contributor = require('../models/Contributor');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('./../../config/auth');
const mailer = require('../../modules/mailer');
const router = express.Router();

router.post('/customer/register', async (req, res) => {
    const { Email } = req.body;
    try {
        if ( await Customer.findOne( { Email }))
            return res.status(400).send({ error: "Cliente já cadastrado" });
        const customer = await Customer.create(req.body);
        customer.Password = undefined;  
        return res.send(customer);
    } catch {
        res.status(400).send({ error : "Falha ao cadastrar usuário" });
    }
});
router.post('/contributor/register', async (req, res) => {
    const { User } = req.body;
    console.log(req.body);
    try {
        if ( await Contributor.findOne( { User }))
            return res.status(400).send({ error: "Cliente já cadastrado" });
        const contributor = await Contributor.create(req.body);
        contributor.Password = undefined;  
        return res.send(contributor);
    } catch(err) {
        console.log(err);
        res.status(400).send({ error : "Falha ao cadastrar usuário" });
    }
});
router.post('/customer/authenticate', async (req, res) => {
    const { Email, Password } = req.body;
    const customer = await Customer.findOne({ Email }).select('+Password');
    if(!customer)
        return res.status(400).send({ "error" : "Cliente não encontrado!"}); 
    if(!await bcrypt.compare(Password, customer.Password))
        return res.status(400).send({ "error" : "Accesso negado!"});
    customer.Password = undefined;
    const token = jwt.sign({ id: customer._id }, authConfig.secret, {
        expiresIn: 86400,
    });
    const session = customer._id;
    
    const result = {
        customer , 
        token ,
        session,
    };
    return res.send( result );
});

router.post('/contributor/authenticate', async (req, res) => {
    const { User, Password } = req.body;
    const contributor = await Contributor.findOne({ User }).select('+Password');
    if(!contributor)
        return res.status(400).send({ "error" : "Colaborador não encontrado!"}); 
    if(!await bcrypt.compare(Password, contributor.Password))
        return res.status(400).send({ "error" : "Accesso negado!"});
    contributor.Password = undefined;
    const token = jwt.sign({ id: contributor._id }, authConfig.secret, {
        expiresIn: 86400,
    });
    const session = contributor._id;
    
    const result = {
        contributor , 
        token ,
        session,
    };
    return res.send( result );
});

router.post('/forgot-password', async (req, res) =>{
    const { Email } = req.body;
    try {
        const customer = Customer.findOne( { Email } );
        if (!customer)
            res.status(400).send({ error : 'Usuário não encontrado!' }); 
        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 1);
        await Customer.findByIdAndUpdate(customer.id, {
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
module.exports = app => app.use('/prosecurity/auth', router);