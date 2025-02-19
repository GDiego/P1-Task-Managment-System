import axios from 'axios';

const API_URL = 'https://localhost:7066/api/Tasks';

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const softDeleteTask = async (id) => {
  await axios.put(`${API_URL}/softdelete/${id}`);
};

export const updateTask = async (id, updatedTask) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTask);
  return response.data;
};
