const express = require("express");

const router = express.Router();

const {
  getTasks,
  addTask,
  completeTask,
  updateTask,
} = require("../Controllers/taskController");

router.get("/", getTasks);

router.post("/", addTask);

router.put("/complete/:id", completeTask);

router.put("/:id", updateTask);

module.exports = router;