import React, { useState, useEffect } from "react";
import axios from "axios";

const todoAxios = axios.create();

todoAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const AppContext = React.createContext();

const initialState = {
  todos: [],
  user: JSON.parse(localStorage.getItem("user")) || {},
  token: localStorage.getItem("token") || ""
};

const AppContextProvider = props => {
  const [globalState, setGlobalState] = useState(initialState);
  const { children } = props;

  useEffect(() => {
    globalState.token && getTodos();
  }, []);

  const getTodos = () => {
    return todoAxios.get("http://localhost:4000/api/todos").then(response => {
      setGlobalState(prevState => {
        return { ...prevState, todos: response.data };
      });
      return response;
    });
  };

  const addTodo = newTodo => {
    return todoAxios
      .post("http://localhost:4000/api/todos/add", newTodo)
      .then(response => {
        getTodos();
        return response;
      });
  };

  const editTodo = (todoId, todo) => {
    return todoAxios.put(`/api/todos/update/${todoId}`, todo).then(response => {
      setGlobalState(prevState => {
        const updatedTodos = prevState.todos.map(todo => {
          return todo._id === response.data._id ? response.data : todo;
        });
        return { ...prevState, todos: [...updatedTodos] };
      });
      getTodos();
      return response;
    });
  };

  const deleteTodo = todoId => {
    return todoAxios.delete(`/api/todos/delete/${todoId}`).then(response => {
      setGlobalState(prevState => {
        const updatedTodos = prevState.todos.filter(todo => {
          return todo._id !== todoId;
        });
        return { ...prevState, todos: [...updatedTodos] };
      });
      getTodos();
      return response;
    });
  };

  const register = userInfo => {
    return todoAxios
      .post("http://localhost:4000/api/users/register", userInfo)
      .then(response => {
        const { user, token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setGlobalState({
          user,
          token
        });
        getTodos();
        return response;
      });
  };

  const login = credentials => {
    return todoAxios
      .post("/api/users/login", credentials)
      .then(response => {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setGlobalState({
          user,
          token
        });
        getTodos();
        return response;
      })
      .catch(err => console.log("err: ", err));
  };

  const logout = () => {
    setGlobalState(initialState);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <AppContext.Provider
      value={{
        getTodos,
        addTodo,
        editTodo,
        deleteTodo,
        register,
        login,
        logout,
        ...globalState
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const withContext = Component => {
  return props => {
    return (
      <AppContext.Consumer>
        {globalState => {
          return <Component {...globalState} {...props} />;
        }}
      </AppContext.Consumer>
    );
  };
};

export { AppContextProvider, withContext };
