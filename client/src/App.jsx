import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CreateTodo from './components/create';
import EditTodo from './components/edit';
import TodosList from './components/list';
import Home from './components/home';
import NavigationPage from './components/navigation';
import Login from './components/auth/login';
import Register from './components/auth/register';
import * as ROUTES from './constants/routes';
import ProtectedRoute from "./components/auth/protectedRoute";

import { Container } from 'semantic-ui-react';

function App() {
  return (
    <Router>
      <NavigationPage/>

      <Container>
        <Switch>
          <Route path={ROUTES.HOME} exact component={Home} />
          <ProtectedRoute path={ROUTES.TODOS} exact component={TodosList} />
          <ProtectedRoute path={ROUTES.EDIT_TODO} component={EditTodo}/>
          <ProtectedRoute path={ROUTES.CREATE_TODO} component={CreateTodo} exact />
          <Route path={ROUTES.LOGIN} component={Login} exact />
          <Route path={ROUTES.REGISTER} component={Register} exact />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
