const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./Config/db");

// Routes
const authRoutes = require("./Routes/authRoutes");
const attendanceRoutes = require("./Routes/attendanceRoutes");
const taskRoutes = require("./Routes/taskRoutes");
const dailyProgressRoutes = require("./Routes/dailyProgressRoutes");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:3000",
        process.env.FRONTEND_URL,
      ];

      callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/daily-progress", dailyProgressRoutes);

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});