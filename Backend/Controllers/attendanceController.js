const Attendance = require("../models/Attendance");

// CHECK IN
const checkIn = async (req, res) => {
try {
const { userId, mode } = req.body;


const attendance = await Attendance.create({
  userId,
  mode,
  checkIn: new Date(),
});

res.status(201).json(attendance);


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// CHECK OUT
const checkOut = async (req, res) => {
try {
const { userId } = req.body;

const attendance = await Attendance.findOne({
  userId,
}).sort({ createdAt: -1 });

if (!attendance) {
  return res.status(404).json({
    message: "No Check In Found",
  });
}

if (attendance.checkOut) {
  return res.status(400).json({
    message: "Already Checked Out",
  });
}

attendance.checkOut = new Date();

await attendance.save();

res.status(200).json(attendance);


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// ATTENDANCE STATS
const getAttendanceStats = async (req, res) => {
try {
const total = await Attendance.countDocuments();

const online = await Attendance.countDocuments({
  mode: "Online",
});

const offline = await Attendance.countDocuments({
  mode: "Offline",
});

const totalPercentage =
  total > 0 ? ((online + offline) / total) * 100 : 0;

const onlinePercentage =
  total > 0 ? (online / total) * 100 : 0;

const offlinePercentage =
  total > 0 ? (offline / total) * 100 : 0;

res.json({
  totalPercentage: totalPercentage.toFixed(0),
  onlinePercentage: onlinePercentage.toFixed(0),
  offlinePercentage: offlinePercentage.toFixed(0),
});


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

module.exports = {
checkIn,
checkOut,
getAttendanceStats,
};