import React from 'react';
import { withRouter } from 'react-router-dom';

import { withContext } from '../../AppContext';

import { Button, Icon, Modal, Form, Header } from 'semantic-ui-react';

const EditTodo = ({ item, editTodo }) => {
  const [todo, setTodo] = React.useState(item);
  const [isOpen, setIsOpen] = React.useState(false);

  const onHandleChangeTodo = ({ target }) => {
    const { value } = target;
    setTodo({ ...todo, title: value });
  };

  const onHandleSubmit = event => {
    event.preventDefault();
    editTodo(item._id, todo);
    handleOpenCloseModal();
  };

  const handleOpenCloseModal = () => {
    setIsOpen(!isOpen);
  }

  return (
    <Modal
      closeIcon
      closeOnDimmerClick
      dimmer
      onActionClick={onHandleSubmit}
      open={isOpen}
      trigger={<Icon link name='edit outline' onClick={handleOpenCloseModal}/>}
      >
      <Header content='EditTodo:' />

      <Modal.Content>

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

      </Modal.Content>
    </Modal>
  );
};

export default withRouter(withContext(EditTodo));
