import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { Button, Card, Badge } from 'react-bootstrap';
import moment from 'moment';

import api from '../../services/api';

// import { Container } from './styles';

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

const Detail: React.FC = () => {
  const history = useHistory();
  const { id } = useParams();

  const [task, setTask] = useState<ITask>();

  useEffect(() => {
    async function loadTask() {
      const { data } = await api.get<ITask>(`/tasks/${id}`);

      setTask(data);

      console.log(data);
    }

    loadTask();
  }, [id])

  function handleBackPage() {
    history.goBack()
  }

  function formatDate(date: Date | undefined) {
    return moment(date).format('DD/MM/YYYY');
  };

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Tasks</h1>
        <Button variant="dark" onClick={handleBackPage}>Back</Button>
      </div>
      <br />

      <Card>
        <Card.Body>
          <Card.Title>{task?.title}</Card.Title>
          <Card.Text>{task?.description}</Card.Text>

          <Badge variant={task?.finished ? 'success' : 'warning'} >
            {task?.finished ? 'Finished' : 'Pending'}
          </Badge>

          <br />

          <strong>Registration Date: </strong>
          <Badge variant="info" >
            {formatDate(task?.created_at)}
          </Badge>

          <br />

          <strong>Update Date: </strong>
          <Badge variant="info" >
            {formatDate(task?.updated_at)}
          </Badge>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Detail;