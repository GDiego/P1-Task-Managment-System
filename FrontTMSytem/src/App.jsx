import { useState, useEffect } from 'react';
import './App.css';
import { getTasks, createTask, deleteTask, updateTask } from './api';

import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./components/ui/table";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

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

  const handleEdit = (id, name, description) => {
    setEditingId(id);
    setNewTaskName(name);
    setNewTaskDescription(description);
  };

  const handleSave = async (id) => {
    await updateTask(id, { id: editingId, name: newTaskName, description: newTaskDescription });
    setEditingId(null);
    setNewTaskName('');
    setNewTaskDescription('');
    loadTasks();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Manager</h1>
      <Card className="p-4 w-full max-w-2xl mx-auto">
        <CardContent>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="New task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="mb-2"
            />
            <Input
              type="text"
              placeholder="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="mb-2"
            />
            <Button onClick={handleAddTask}>Add</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.id}</TableCell>
                  <TableCell>
                    {editingId === task.id ? (
                      <Input
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                      />
                    ) : (
                      task.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === task.id ? (
                      <Input
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                      />
                    ) : (
                      task.description
                    )}
                  </TableCell>
                  <TableCell className="space-x-2">
                    {editingId === task.id ? (
                      <Button onClick={() => handleSave(task.id)}>Save</Button>
                    ) : (
                      <Button onClick={() => handleEdit(task.id, task.name, task.description)}>Edit</Button>
                    )}
                    <Button variant="destructive" onClick={() => handleDeleteTask(task.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;