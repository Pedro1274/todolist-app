import { useState } from 'react'
import { Trash2 } from 'lucide-react';
import './App.css'

interface Task {
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1 className="title has-text-centered">Lista de Afazeres</h1>
      
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Adicionar uma nova tarefa"
          />
        </div>
      </div>

      <div className="control">
        <button className="button is-primary is-fullwidth" onClick={addTask}>
          Adicionar Tarefa
        </button>
      </div>
  
      <div className="tasks-container">
        {tasks.map((task, index) => (
          <div key={index} className="task-item box">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
              />
              <span className={task.completed ? 'has-text-grey-dark' : ''}>
                {task.text.length > 70 ? `${task.text.slice(0, 70)}...` : task.text}
              </span>
            </label>
            <button
              className="button-border"
              onClick={() => deleteTask(index)}
              aria-label="Deletar tarefa"
            >
              <Trash2 size={20} color="#e74c3c" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
