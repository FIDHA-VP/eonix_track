import axios from "axios";

const API = axios.create({
  baseURL: "https://eonix-backend-7uv4.onrender.com/api/attendance",
});

export const checkIn = (userId, mode) => {
  return API.post("/checkin", {
    userId,
    mode,
  });
};

export const checkOut = (userId) => {
  return API.post("/checkout", {
    userId,
  });
};