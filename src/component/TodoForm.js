import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

function TodoForm({ addTodo, editing, editedTodo = null }) {
  const [value, setValue] = useState('');
  //date selection to be added:
  //const [date, setDate] = useState();

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <div>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            placeholder={editedTodo.task}
            value={editedTodo.task}
            onChange={e => setValue(e.target.value)}
          />
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            placeholder="Hello! Please input a task here."
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </form>
      )}
    </div>
  );
}

export default TodoForm;
