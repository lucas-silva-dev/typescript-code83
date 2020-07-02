/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { Table, Badge, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import api from '../../services/api';
import ModalRemove from '../../components/ModalRemove';
import ModalFinish from '../../components/ModalFinish';

import './styles.css';


interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const history = useHistory();

  useEffect(() => {
    async function loadTasks() {
      const { data } = await api.get('/tasks');

      const serializedData = data.map((datas: ITask) => ({
        ...datas,
        updated_at: formatDate(datas.updated_at),
        created_at: formatDate(datas.created_at)
      }));

      setTasks(serializedData);
    }

    loadTasks();
  }, [tasks]);


  function formatDate(date: Date) {
    return moment(date).format('DD/MM/YYYY');
  };


  function handleGoToDetail(id: number) {
    history.push(`/tasks/${id}`)
  };


  function handleAddNewTask() {
    history.push('/new_task')
  };

  function handleEditTask(id: number) {
    history.push(`/new_task/${id}`)
  };

  // async function handlePatchTask(id: number) {
  //   await api.put(`/tasks/${id}`, { finished: true });
  // };

  // async function handleDeleteTask(id: number) {
  //   await api.delete(`/tasks/${id}`);
  // };


  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Tasks</h1>
        <Button variant="dark" onClick={handleAddNewTask}>New Task</Button>
      </div>
      <br />

      <Table striped bordered hover variant="dark" className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Update Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td > {task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.updated_at}</td>
              <td>
                <Badge variant={task.finished ? 'success' : 'warning'} >
                  {task.finished ? 'Finished' : 'Pending'}
                </Badge>
              </td>
              <td>
                {/* <Button
                  disabled={task.finished}
                  size='sm' variant="success"
                  onClick={() => handlePatchTask(task.id)}
                > This is another way to create the code below
                  Finish
                </Button>{' '} */}

                <ModalFinish id={task.id} />{' '}

                <Button
                  disabled={task.finished}
                  size='sm' variant="warning"
                  onClick={() => handleEditTask(task.id)}
                >
                  Edit
                </Button>{' '}
                <Button
                  size='sm' variant="info"
                  onClick={() => handleGoToDetail(task.id)}
                >
                  View
                </Button>{' '}
                {/* <Button
                  size='sm' variant="danger"
                  onClick={() => handleDeleteTask(task.id)}
                > This is another way to create the code below
                  Remove
                </Button>{' '} */}

                <ModalRemove id={task.id} />

              </td>
            </tr>
          ))}
        </tbody>
      </Table>


    </div>
  );
};

export default Tasks;