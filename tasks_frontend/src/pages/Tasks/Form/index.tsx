import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import api from '../../../services/api';

import './styles.css';


interface ITask {
  title: string;
  description: string;
}

const TasksForm: React.FC = () => {
  const history = useHistory();
  const { id } = useParams();

  const [model, setModel] = useState<ITask>({
    title: '',
    description: ''
  });

  useEffect(() => {
    async function loadTask() {
      const { data } = await api.get(`/tasks/${id}`);

      setModel({
        title: data.title,
        description: data.description,
      })
    }

    if (id !== undefined) {
      loadTask()
    }
  }, [id])

  function handleUpdateModel(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setModel({
      ...model,
      [name]: value
    });
  }

  function handleBackPage() {
    history.goBack()
  }

  async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      await api.put(`/tasks/${id}`, model);

      return alert('Task has been updated!');
    }

    await api.post('/tasks', model);

    alert('Task has been registered!');

    setModel({
      title: '',
      description: '',
    })
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Add new task</h1>
        <Button variant="dark" onClick={handleBackPage}>Back</Button>
      </div>
      <br />

      <div className="container dark">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="labels">Title</Form.Label>
            <Form.Control
              className="inputs"
              type="text"
              placeholder=""
              name="title"
              value={model.title}
              onChange={handleUpdateModel}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="labels">Description</Form.Label>
            <Form.Control
              className="inputs"
              as="textarea" rows={3}
              placeholder=""
              name="description"
              value={model.description}
              onChange={handleUpdateModel}
              required
            />
          </Form.Group>

          <Button variant="light" type="submit">Save</Button>
        </Form>

      </div>
    </div>
  );
};

export default TasksForm;