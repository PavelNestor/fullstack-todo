import React from 'react';

import TodoItem from './todoItem';
import CreateTodo from '../create';
import { withContext } from '../../AppContext';

import { Header, List } from 'semantic-ui-react';

const TodosList = ({ deleteTodo, editTodo, todos }) => (
  <section>
    <CreateTodo/>
    <Header as='h3'>Todos List:</Header>

    <List ordered divided verticalAlign='middle'>
      {todos && todos.map((item, index) => 
        <TodoItem
          key={item._id}
          item={item}
          handleEditTodo={editTodo}
          handleDeleteTodo={deleteTodo}/>)}
    </List>
  </section>
);

export default withContext(TodosList);
