const mongoose = require("mongoose");
module.exports = mongoose.model(
  "task1",
  new mongoose.Schema({
    task1: String,
    pid: String,
    status: String,
    timestamp: {
      type: Date,
      default: Date.now(),
    },
  })
);
