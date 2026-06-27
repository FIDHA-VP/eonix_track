const mongoose = require("mongoose");
require("dotenv").config();

(async () => {
  try {
    console.log("URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();