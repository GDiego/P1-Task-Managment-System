import axios from 'axios';

const API_URL = 'https://your-api-url.com/tasks'; // Reemplázalo con la URL real de tu backend

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateTask = async (id, updatedTask) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTask);
  return response.data;
};
