import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from "./component/Todo";
import TodoForm from "./component/TodoForm";
import todoList from "./component/todoList.json";

function App() {
  const [todos, setTodos] = useState(todoList);

  const [lastCompletedIdx, setLastCompletedIdx] = useState(0);

  useEffect(() => {
    for (let i = 0; i < todos.length; i++) {
      let currTodo = todos[i];

      if (!currTodo.isCompleted) {
      }
    }
  });

  const addTodo = text => {
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

  const uncompleteTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = false;
    const uncheckedTodo = newTodos.splice(index, 1);

    for (let i = 0; i < newTodos.length; i++) {
      let currTodo = newTodos[i];
      if (currTodo.isCompleted) {
        //insert one before
      }
    }

    setTodos(newTodos);
  };

  const editTodo = index => {
    const newTodos = [...todos];
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        <div className="todo-add">
          <TodoForm addTodo={addTodo} />
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
