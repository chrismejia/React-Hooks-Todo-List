import React, { useState } from "react";
import "./App.css";
import Todo from "./component/Todo";
import TodoForm from "./component/TodoForm";

function App() {
  const [todos, setTodos] = useState([
    {
      text: "Learn about React Hooks",
      isCompleted: false
    },
    {
      text: "Visit Rich",
      isCompleted: false
    },
    {
      text: "Pick something to eat for lunch",
      isCompleted: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    // Spread list of todos in array

    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    const [newPosition] = newTodos.splice(index, 1);
    newTodos.push(newPosition);
    setTodos(newTodos);
  };

  const uncompleteTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = false;
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
        <div class="todo-add">
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
