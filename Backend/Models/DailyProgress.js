const mongoose = require("mongoose");

const dailyProgressSchema = new mongoose.Schema(
  {
    employee: {
      type: String,
      required: true,
    },

    ongoingTasks: {
      type: [String],
      default: [],
    },

    completedTasks: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "DailyProgress",
  dailyProgressSchema
);