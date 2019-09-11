const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
const server = require('http').Server(app);
const io = require('socket.io')(server);
io.on('connection', (socket) => {
    socket.on('connectRoom', (panic) => {
        socket.join(panic);
    });
    socket.on('connectRoom', (contributors) => {
        socket.join(contributors);
    });
    socket.on('connectRoom', (customers) => {
        socket.join(customers);
    });
});
app.use((req, res, next) => {
    req.io = io;
    return next();
});

// CONSELHO CIC
app.use('/conselho-cic/files', express.static(path.resolve(__dirname, 'apps', 'conselho-cic' , 'files','resized')));
// SISPECON
app.use('/sispecon/files', express.static(path.resolve(__dirname, 'apps', 'sispecon' , 'files','resized')));
// PRO SECURITY
app.use('/prosecurity/files', express.static(path.resolve(__dirname, 'apps', 'prosecurity' , 'files','resized')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Injeção dos Controllers
// CONSELHO CIC
//require('./apps/prosecurity/src/app/controllers/index')(app); 
// SISPECON
require('./apps/sispecon/src/app/controllers/index')(app);
// PRO SECURITY
require('./apps/prosecurity/src/app/controllers/index')(app);
//Informação da porta de execução
server.listen(process.env.PORT || 3333);