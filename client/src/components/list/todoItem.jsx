import React from 'react';

import { withContext } from '../../AppContext';
import EditTodo from '../edit';

import { Icon, List } from 'semantic-ui-react';

const TodoItem = ({ item, handleDeleteTodo }) => {

  return(
    item && (
      <List.Item >
        <List.Content floated='left'>
          {item.title}
        </List.Content>

        <List.Content floated='right'>
          <Icon link name='close' onClick={() => handleDeleteTodo(item._id)}/>
        </List.Content>

        <List.Content floated='right'>
          <EditTodo item={item}/>
        </List.Content>
    </List.Item>
    )
  )
};

export default withContext(TodoItem);
