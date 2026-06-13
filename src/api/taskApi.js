import axios from "axios";

const API = "http://localhost:5000/api/tasks";

export const getTasks = () => axios.get(API);

export const addTask = (task) =>
  axios.post(API, { title: task });

export const updateTask = (id, title) =>
  axios.put(`${API}/${id}`, { title });

export const completeTask = (id) =>
  axios.put(`${API}/complete/${id}`);