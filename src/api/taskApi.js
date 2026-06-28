import axios from "axios";

const API = "https://eonix-backend-7uv4.onrender.com/api/tasks";

export const getTasks = () => axios.get(API);

export const addTask = (task) =>
  axios.post(API, { title: task });

export const updateTask = (id, title) =>
  axios.put(`${API}/${id}`, { title });

export const completeTask = (id) =>
  axios.put(`${API}/complete/${id}`);