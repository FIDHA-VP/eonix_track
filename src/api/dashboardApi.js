import axios from "axios";

const API = axios.create({
  baseURL: "https://eonix-backend-7uv4.onrender.com/api/attendance",
});

export const getAttendanceStats = () =>
API.get("/stats");