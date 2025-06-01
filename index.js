require("dotenv").config();
const express = require("express");
const routes = require('./routes');

const app = express();

// Middleware para processar JSON
app.use(express.json());

// Rota raiz
app.get('/', (req, res) => {
    res.json({
        status: 'online',
        rotas_disponiveis: {
            usuarios: '/api/users',
            voos: '/api/flights',
            aeronaves: '/api/aircrafts',
            passageiros: '/api/passengers',
            cartoes_embarque: '/api/boarding-passes'
        }
    });
});

// Usando todas as rotas
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log('O servidor está rodando');
    console.log('Para desligar o servidor, use o comando: ctrl + c');
});

