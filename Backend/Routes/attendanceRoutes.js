const express = require("express");
const router = express.Router();

const {
checkIn,
checkOut,
getAttendanceStats,
} = require("../controllers/attendanceController");

router.post("/checkin", checkIn);
router.post("/checkout", checkOut);

router.get("/stats", getAttendanceStats);

module.exports = router;