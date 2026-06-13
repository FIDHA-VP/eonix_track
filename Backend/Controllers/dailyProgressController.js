const DailyProgress = require("../models/DailyProgress");

// CREATE
exports.createProgress = async (req, res) => {
  try {
    const progress = await DailyProgress.create(req.body);

    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL
exports.getAllProgress = async (req, res) => {
  try {
    const progress = await DailyProgress.find();

    res.json(progress);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE
exports.updateProgress = async (req, res) => {
  try {
    const progress =
      await DailyProgress.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(progress);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE
exports.deleteProgress = async (req, res) => {
  try {
    await DailyProgress.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};