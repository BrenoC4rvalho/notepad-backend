import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import Auth from '../middlewares/auth';

const routes = Router();

routes.post('/signup', UsersController.create);
routes.post('/signin', UsersController.session);

//precisa de autenticação

routes.get('/:id', Auth.private, UsersController.show);
routes.delete('/:id', Auth.private, UsersController.destroy);

export default routes;