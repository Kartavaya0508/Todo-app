import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import icon from "./assets/images/icon.png"

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    // Load tasks from localStorage when the component mounts
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const taskArray = savedTasks.split(',').map((task) => {
        const [text, isChecked] = task.split(':');
        return {
          text,
          isChecked: isChecked === 'true',
        };
      });
      setTasks(taskArray);
    }
  }, []);

  useEffect(() => {
    // Save tasks to localStorage whenever they change
    const taskStrings = tasks.map(task => `${task.text}:${task.isChecked}`);
    localStorage.setItem('tasks', taskStrings.join(','));
  }, [tasks]);

  const addTask = () => {
    const inputValue = inputRef.current.value;

    if (inputValue === '') {
      alert("You must write something!");
    } else {
      setTasks([...tasks, { text: inputValue, isChecked: false }]);
      inputRef.current.value = '';
    }
  };

  const toggleCheck = (index) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, isChecked: !task.isChecked };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container">
      <div className="todo-app">
        <h2>To-Do List <img src={icon} alt="icon" /></h2>
        <div className="row">
          <input type="text" ref={inputRef} placeholder="Add Your Text" />
          <button onClick={addTask}>Add</button>
        </div>
        <ul id="list-container">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={task.isChecked ? 'checked' : ''}
              onClick={() => toggleCheck(index)}
            >
              {task.text}
              <span onClick={(e) => { e.stopPropagation(); removeTask(index); }}>&times;</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
