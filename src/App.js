import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from "./component/Todo";
import TodoForm from "./component/TodoForm";
import todoList from "./component/todoList.json";

function App() {
  const [todos, setTodos] = useState(todoList);

  const [firstCompTodo, setFirstCompTodo] = useState(0);

  const [dateAscending, setDateAscending] = useState(true);

  const [nameAscending, setNameAscending] = useState(true);

  useEffect(() => {
    for (let i = 0; i < todos.length; i++) {
      let currTodo = todos[i];

      if (currTodo.isCompleted) {
        if (i === 0) {
          setFirstCompTodo(0);
          break;
        }
        setFirstCompTodo(i);
        break;
      }
    }
  }, [todos]);

  //we should add a way for the due date to be chosen
  //maybe there's a calendar library or something
  const addTodo = (text, date) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  // Spread list of todos in array
  // Mark active todo as completed
  // Capture active and remove it from newTodos array
  // Redefine newTodos by spreading newTodos array
  // and adding finishedTodo at end; keep immutable
  // Update todos with updated newTodos array
  const completeTodo = index => {
    let newTodos = [...todos];
    newTodos[index].isCompleted = true;
    const [finishedTodo] = newTodos.splice(index, 1);
    newTodos = [...newTodos, finishedTodo];
    setTodos(newTodos);
  };

  //make array from state obj, plus maintain immutability
  //make arr of active todos
  //make arr of finished todos minus selected one
  //point to selected task
  //alter the selected task
  //spread and rearrange active todos, then newly active todo, then finished todos
  //set state to match new data
  const uncompleteTodo = index => {
    const todosList = [...todos];
    const unCompTodos = todosList.filter(todo => {
      return !todo.isCompleted;
    });
    const otherCompTodos = todosList.filter((todo, idx) => {
      return todo.isCompleted && idx !== index;
    });
    const uncheckedTodo = todosList[index];
    uncheckedTodo.isCompleted = false;
    const rearrangedTodos = [...unCompTodos, uncheckedTodo, ...otherCompTodos];
    setTodos(rearrangedTodos);
  };

  const editTodo = index => {
    const newTodos = [...todos];
  };

  const removeTodo = index => {
    const todosList = [...todos];
    let newTodos = [
      ...todosList.slice(0, index),
      ...todosList.slice(index + 1)
    ];
    setTodos(newTodos);
  };

  const dateSort = () => {
    const todosList = [...todos];

    const unCompTodos = todosList.filter(todo => {
      return !todo.isCompleted;
    });

    const compTodos = todosList.filter(todo => {
      return todo.isCompleted;
    });

    if (dateAscending) {
      unCompTodos.sort((a, b) => {
        if (a.dueDate > b.dueDate) {
          return 1;
        } else {
          return -1;
        }
      });
      compTodos.sort((a, b) => {
        if (a.dueDate > b.dueDate) {
          return 1;
        } else {
          return -1;
        }
      });
    } else {
      unCompTodos.sort((a, b) => {
        if (a.dueDate < b.dueDate) {
          return 1;
        } else {
          return -1;
        }
      });
      compTodos.sort((a, b) => {
        if (a.dueDate < b.dueDate) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    setDateAscending(!dateAscending);
    const sortedTodos = [...unCompTodos, ...compTodos];
    setTodos(sortedTodos);
  };

  const nameSort = () => {
    const todosList = [...todos];

    const unCompTodos = todosList.filter(todo => {
      return !todo.isCompleted;
    });

    const compTodos = todosList.filter(todo => {
      return todo.isCompleted;
    });

    if (nameAscending) {
      unCompTodos.sort((a, b) => {
        if (a.text > b.text) {
          return 1;
        } else {
          return -1;
        }
      });
      compTodos.sort((a, b) => {
        if (a.text > b.text) {
          return 1;
        } else {
          return -1;
        }
      });
    } else {
      unCompTodos.sort((a, b) => {
        if (a.text < b.text) {
          return 1;
        } else {
          return -1;
        }
      });
      compTodos.sort((a, b) => {
        if (a.text < b.text) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    setNameAscending(!nameAscending);
    const sortedTodos = [...unCompTodos, ...compTodos];
    setTodos(sortedTodos);
  };

  return (
    <div className="app">
      <div className="todos">
        <div className="todo-add">
          <TodoForm addTodo={addTodo} />
        </div>
        <div className="sort-button-group">
          <button className="sort-button" onClick={dateSort}>
            Sort by Date
          </button>
          <button className="sort-button" onClick={nameSort}>
            Sort by Name
          </button>
        </div>
        <div className="todo-list">
          {todos.map((todo, index) => (
            <Todo
              key={index}
              index={index}
              todo={todo}
              completeTodo={completeTodo}
              uncompleteTodo={uncompleteTodo}
              editTodo={editTodo}
              removeTodo={removeTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
