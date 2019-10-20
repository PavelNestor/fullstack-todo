import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { withContext } from '../../AppContext';

import { Menu } from 'semantic-ui-react';

const Navigation = ({ history, logout, token }) => {
  const [activeItem, setActiveItem] = useState('HOME');

  const onHandleItemClick = (event, { name }) => {
    setActiveItem(name);
    history.push(ROUTES[name]);
  };

  const onHandleLogout = () => {
    logout();
    history.push(ROUTES.HOME);
  };

  return (
    <div>
      {token ? ( 
            <NavigationAuth
              activeItem={activeItem}
              handleItemClick={onHandleItemClick}
              handleLogout={onHandleLogout}
            />
          ) : (
            <NavigationNonAuth activeItem={activeItem} handleItemClick={onHandleItemClick} />
          )
      }
    </div>
  );
};

const NavigationAuth = ({ activeItem, handleItemClick, handleLogout }) => (
  <Menu stackable>
        <Menu.Item
          name='HOME'
          active={activeItem === 'HOME'}
          onClick={handleItemClick}
        >
          Home
        </Menu.Item>

        <Menu.Item
          name='TODOS'
          active={activeItem === 'TODOS'}
          onClick={handleItemClick}
        >
          TodosList
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu.Menu>
      </Menu>
);

const NavigationNonAuth = ({ activeItem, handleItemClick }) => (
  <Menu stackable>
        <Menu.Item
          name='HOME'
          active={activeItem === 'HOME'}
          onClick={handleItemClick}
        >
          Home
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item
            name='LOGIN'
            active={activeItem === 'LOGIN'}
            onClick={handleItemClick}
          >
            Login
          </Menu.Item>

          <Menu.Item
            name='REGISTER'
            active={activeItem === 'REGISTER'}
            onClick={handleItemClick}
          >
            Register
          </Menu.Item>
        </Menu.Menu>
      </Menu>
);

const NavigationPage = withRouter(withContext(Navigation));

export default NavigationPage;
