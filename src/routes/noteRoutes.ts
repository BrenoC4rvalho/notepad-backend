import { Router } from 'express';
import NotesController from '../controllers/NotesController';
import Auth from '../middlewares/auth';

const routes = Router();

routes.get('/note/:nickname', Auth.private, NotesController.index);
routes.post('/note/:nickname', Auth.private, NotesController.create);
routes.get('/note/:nickname/:id', Auth.private, NotesController.show);
routes.put('/note/:nickname/:id', Auth.private, NotesController.update);
routes.delete('/note/:nickname/:id', Auth.private, NotesController.destroy);

export default routes;
