import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import auth from './app/middlewares/auth';

const routes = Router();

import UserController from './app/controllers/UserController';
import FilePerfilController from './app/controllers/FilePerfilController';
import AddressController from './app/controllers/AddressController';
import SessionsController from './app/controllers/SessionsController';

//Rotas sem autenticação
routes.post('/user', UserController.store);
routes.post('/filePerfil',multer(multerConfig).single('file') ,FilePerfilController.store);
routes.post('/address', AddressController.store);
routes.post('/sessions', SessionsController.store);

//Rotas com autenticação JWT
routes.use(auth);
routes.get('/user', UserController.index);

export default routes;