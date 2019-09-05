import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

function TodoForm({ addTodo, editedTodo }) {
  const [value, setValue] = useState('');
  //date selection to be added:
  //const [date, setDate] = useState();
  let text = '';
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  if (editedTodo !== null) {
    text = editedTodo.task;
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder={text}
          defaultValue={text}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    );
  } else {
    text = 'Hello! Please input a task here.';
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder={text}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    );
  }
}

export default TodoForm;
