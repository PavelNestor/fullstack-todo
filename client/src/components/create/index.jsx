import React from 'react';

import { withContext } from '../../AppContext';

import { Button, Form, Header } from 'semantic-ui-react';

const initialTodo = {
  title: ''
};

const CreateTodo = ({ addTodo, history }) => {
  const [todo, setTodo] = React.useState(initialTodo);

  const onHandleChangeTodo = ({ target }) => {
    const { value } = target;
    setTodo({ ...todo, title: value });
  };

  const onHandleSubmit = event => {
    event.preventDefault();
    addTodo(todo).then(res => {
      setTodo(initialTodo);
    });
  };

  return (
    <section>
      <Header as='h3'>Add new todo: </Header>

      <Form onSubmit={onHandleSubmit}>
        <Form.Field>
          <Form.Input
            placeholder='ToDo'
            name='todo'
            value={todo.title}
            onChange={onHandleChangeTodo}
          />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    </section>
  );
};

export default withContext(CreateTodo);
