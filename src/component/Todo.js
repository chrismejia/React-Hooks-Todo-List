import React from "react";

function Todo({
  todo,
  index,
  completeTodo,
  uncompleteTodo,
  removeTodo,
  editTodo
}) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      <div className="single-todo">{todo.text}</div>
      <div className="due-date">Due: {todo.dueDate}</div>

      {todo.isCompleted ? (
        <button className="todo-button" onClick={() => uncompleteTodo(index)}>
          UNComplete
        </button>
      ) : (
        <button className="todo-button" onClick={() => completeTodo(index)}>
          Complete
        </button>
      )}
      <button className="todo-button" onClick={() => editTodo(index)}>
        Edit
      </button>
      <button className="todo-button" onClick={() => removeTodo(index)}>
        X
      </button>
    </div>
  );
}

export default Todo;
