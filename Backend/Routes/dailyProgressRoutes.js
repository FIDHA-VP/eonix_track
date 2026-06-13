const express = require("express");

const router = express.Router();

const {
  createProgress,
  getAllProgress,
  updateProgress,
  deleteProgress,
} = require("../controllers/dailyProgressController");

router.post("/", createProgress);

router.get("/", getAllProgress);

router.put("/:id", updateProgress);

router.delete("/:id", deleteProgress);

module.exports = router;