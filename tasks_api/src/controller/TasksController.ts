import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import Tasks from '../entity/Tasks';

class TasksController {
  async store(request: Request, response: Response) {
    const { title, description } = request.body;

    const task = await getRepository(Tasks).save({
      title,
      description,
    });

    return response.json(task);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    const { affected } = await getRepository(Tasks).update(id, request.body);

    if (affected) {
      const updatedTask = await getRepository(Tasks).findOne(id);

      return response.json(updatedTask);
    }

    return response.status(404).json({ error: 'Task not found' });
  }

  async index(request: Request, response: Response) {
    const tasks = await getRepository(Tasks).find();

    return response.json(tasks);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const task = await getRepository(Tasks).findOne(id);

    if (!task) {
      return response.status(404).json({ error: 'Task not found' });
    }

    return response.json(task);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const { affected } = await getRepository(Tasks).delete(id);

    if (affected) {
      return response.json({ message: 'Task removed' });
    }

    return response.status(404).json({ error: 'Task not found' });
  }
}

export default new TasksController();
