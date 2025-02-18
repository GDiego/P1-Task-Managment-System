import { useState, useEffect } from 'react';
import './App.css';
import { getTasks, createTask, deleteTask, updateTask } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleAddTask = async () => {
    if (!newTask.trim() || !newDescription.trim()) return;
    await createTask({ name: newTask, description: newDescription, completed: false });
    setNewTask('');
    setNewDescription('');
    loadTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleToggleTask = async (id, completed) => {
    await updateTask(id, { completed: !completed });
    loadTasks();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Manager</h1>
      <input
        type="text"
        placeholder="New task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <button onClick={handleAddTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ display: 'flex', gap: '10px' }}>
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => handleToggleTask(task.id, task.completed)}
            >
              {task.name} - {task.description}
            </span>
            <button onClick={() => handleDeleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;