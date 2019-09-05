import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './component/Todo';
import TodoForm from './component/TodoForm';
import todoList from './component/todoList.json';

function App() {
  const [todos, setTodos] = useState(todoList);

  const [firstCompTodo, setFirstCompTodo] = useState(0);

  const [dateAscending, setDateAscending] = useState(false);

  const [nameAscending, setNameAscending] = useState(true);

  const [editing, setEditing] = useState(false);

  const [editedTodo, setEditedTodo] = useState(null);

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
    setEditing(false);
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

  const uncompleteTodo = index => {
    //make array from state obj, plus maintain immutability
    const todosList = [...todos];
    //make arr of active todos
    const unCompTodos = todosList.filter(todo => {
      return !todo.isCompleted;
    });
    //make arr of finished todos minus selected one
    const otherCompTodos = todosList.filter((todo, idx) => {
      return todo.isCompleted && idx !== index;
    });
    //point to selected task
    const uncheckedTodo = todosList[index];
    //alter the selected task
    uncheckedTodo.isCompleted = false;
    //spread and rearrange active todos, then newly active todo, then finished todos
    const rearrangedTodos = [...unCompTodos, uncheckedTodo, ...otherCompTodos];
    //set state to match new data
    setTodos(rearrangedTodos);
  };

  const editTodo = index => {
    const newTodos = [...todos];

    setEditedTodo(newTodos[index]);

    setEditing(true);
  };

  const removeTodo = index => {
    const todosList = [...todos];
    let newTodos = [
      ...todosList.slice(0, index),
      ...todosList.slice(index + 1),
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
      <div className="todo-list">
        <button onClick={dateSort}>Sort by Date</button>
        <button onClick={nameSort}>Sort by Name</button>
        {editing ? (
          <div className="todo-add">
            <TodoForm
              addTodo={addTodo}
              editedTodo={editedTodo}
              editing={editing}
            />
          </div>
        ) : (
          <div className="todo-add">
            <TodoForm addTodo={addTodo} editTodo={editTodo} editing={editing} />
          </div>
        )}
        <div>
          <p>Idx of first completed todo is: {firstCompTodo}</p>
        </div>
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
  );
}

export default App;
