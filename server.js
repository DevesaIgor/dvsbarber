import express from 'express';
import cors from 'cors';
import Estabelecimento from './src/routes/routesEstabelecimento.js';

const server = express();

server.use(express.json());
server.use(cors());

server.use("/estabelecimento", Estabelecimento)

server.listen(3333, () => {
    console.log("Servidor rodando na port: 3333!");
});