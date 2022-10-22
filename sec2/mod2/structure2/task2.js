const mongoose = require("mongoose");

const y = mongoose.model(
  "file",
  new mongoose.Schema({
    date: {
      type: Date,
      default: Date.now(),
    },
    taskId: {
      type: String,
    },
    processId: String,
    o: Object,
  })
);
module.exports = y;
