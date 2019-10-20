import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { withContext } from '../../AppContext'
import * as ROUTES from '../../constants/routes';

import { Button, Form, Header } from 'semantic-ui-react';

const initialUserInfo = {
  name: '',
  email: '',
  password: '',
  password2: ''
};

const Register = ({ register, history}) => {
  const [userInfo, setUserInfo] = useState(initialUserInfo);

  const onHandleSubmit = event => {
    event.preventDefault();
    register(userInfo).then(res => history.push(ROUTES.TODOS));
  };

  const onHandleChangeUserInfo = event => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <section>
      <Header as='h4'>Register</Header>
      <Form onSubmit={onHandleSubmit}>
        <Form.Field>
          <Form.Input
            placeholder='Name'
            name='name'
            value={userInfo.name}
            onChange={onHandleChangeUserInfo}
          />
        </Form.Field>
        
        <Form.Field>
          <Form.Input
            placeholder='E-mail'
            name='email'
            value={userInfo.email}
            onChange={onHandleChangeUserInfo}
          />
        </Form.Field>
        
        <Form.Field>
          <Form.Input
            placeholder='Password'
            type='password'
            name='password'
            value={userInfo.password}
            onChange={onHandleChangeUserInfo}
          />
        </Form.Field>
        
        <Form.Field>
          <Form.Input
            placeholder='Confirm password'
            name='password2'
            type='password'
            value={userInfo.password2}
            onChange={onHandleChangeUserInfo}
          />
        </Form.Field>

        <Button type='submit'>Submit</Button>
      </Form>
    </section>
  );
};

export default withRouter(withContext(Register));
