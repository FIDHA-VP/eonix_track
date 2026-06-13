import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/attendance",
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