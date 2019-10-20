import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';

import { withContext } from "../../AppContext"

import { Button, Form, Header } from 'semantic-ui-react';

const initialUserInfo = {
  email: '',
  password: ''
};

const Login = ({ login, history }) => {
  const [userInfo, setUserInfo] = useState(initialUserInfo);

  const onHandleSubmit = event => {
    event.preventDefault();

    login(userInfo).then(res => history.push('/todos'));
    setUserInfo(initialUserInfo);
  };

  const onHandleChangeUserInfo = event => {
    const { name, value } = event.target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <section>
      <Header as='h4' className='firstHeader'>Login</Header>

      <Form onSubmit={onHandleSubmit}>

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

        <Button type='submit'>Submit</Button>
      </Form>
    </section>
  );
};

export default withRouter(withContext(Login));
