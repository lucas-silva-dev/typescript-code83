import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Tasks from './pages/Tasks';
import TasksDetail from './pages/Detail';
import TasksForm from './pages/Tasks/Form';

// import { Container } from './styles';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/tasks" exact component={Tasks} />
      <Route path="/tasks/:id" exact component={TasksDetail} />
      <Route path="/new_task" exact component={TasksForm} />
      <Route path="/new_task/:id" exact component={TasksForm} />
    </Switch>
  );
}

export default Routes;