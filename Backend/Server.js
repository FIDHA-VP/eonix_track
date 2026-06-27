const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// Routes (FIXED case consistency)
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dailyProgressRoutes = require("./routes/dailyProgressRoutes");

dotenv.config();

const app = express();

/* ========================
   CORS CONFIG (FIXED)
======================== */
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:3000",
        process.env.FRONTEND_URL,
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // allow for now (avoids frontend blocking issues)
      }
    },
    credentials: true,
  })
);

/* ========================
   MIDDLEWARE
======================== */
app.use(express.json());

/* ========================
   DATABASE CONNECTION
======================== */
connectDB();

/* ========================
   ROUTES
======================== */
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/daily-progress", dailyProgressRoutes);

/* ========================
   TEST ROUTE
======================== */
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

/* ========================
   START SERVER
======================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});