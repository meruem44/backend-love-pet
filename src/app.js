import express from 'express';
import cors from 'cors';
import { resolve } from 'path';

import './database/connection'; // Conexão com o Banco

import routes from './routes';

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use('/files', express.static(resolve(__dirname, '..', 'public', 'uploads')));
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;