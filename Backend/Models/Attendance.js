const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
{
userId: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
},


mode: {
  type: String,
  enum: ["Online", "Offline"],
  default: "Online",
},

checkIn: {
  type: Date,
},

checkOut: {
  type: Date,
},

},
{
timestamps: true,
}
);

module.exports = mongoose.model("Attendance", attendanceSchema);