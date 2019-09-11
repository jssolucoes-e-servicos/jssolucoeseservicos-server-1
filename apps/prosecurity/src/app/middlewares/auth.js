const jwt = require('jsonwebtoken');
const authConfig = require('./../../config/auth');
module.exports = (req, res, next) => {
    const authHeaders = req.headers.authorization;
    if(!authHeaders){
        return res.status(401).send({ error: 'Token não informado' });
    }
    const parts = authHeaders.split(' ');
    if(!parts.length === 2 ){
        return res.status(401).send({ error: 'Token com erro' }); 
    }
    const [ scheme, token ] = parts;
    if(!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token fora do padrão' });
    }
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Token invalido' }); 
        req.Usuario_id = decoded.id;
        return next();
    })
};