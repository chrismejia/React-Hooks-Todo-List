import React from 'react';

function Todo({
  todo,
  index,
  completeTodo,
  uncompleteTodo,
  removeTodo,
  editTodo,
}) {
  return (
    <div
      className="todo"
      style={{
        textDecoration: todo.isCompleted ? 'line-through' : '',
      }}
    >
      <div className={todo.isCompleted ? 'single-todo-done' : 'single-todo'}>
        {todo.task}
      </div>
      <div className="due-date">Due: {todo.dueDate}</div>

      {todo.isCompleted ? (
        <div>
          <button className="todo-button" onClick={() => uncompleteTodo(index)}>
            Undo
          </button>
          <button className="todo-button" onClick={() => removeTodo(index)}>
            X
          </button>
        </div>
      ) : (
        <div>
          <button className="todo-button" onClick={() => completeTodo(index)}>
            Complete
          </button>
          <button className="todo-button" onClick={() => editTodo(index)}>
            Edit
          </button>
          <button className="todo-button" onClick={() => removeTodo(index)}>
            X
          </button>
        </div>
      )}
    </div>
  );
}

export default Todo;
