import { Router, Request, Response } from 'express';

import TasksController from './controller/TasksController';

const routes = Router();

routes.post('/tasks', TasksController.store);

routes.get('/tasks', TasksController.index);
routes.get('/tasks/:id', TasksController.show);

routes.put('/tasks/:id', TasksController.update);

routes.delete('/tasks/:id', TasksController.delete);

export default routes;
