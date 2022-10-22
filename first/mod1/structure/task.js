const mongoosedb = require("mongoose");
module.exports = mongoosedb.model(
  "task1",
  new mongoosedb.Schema({
    task1: String,
    pid: String,
    status: String,
    timestamp: {
      type: Date,
      default: Date.now(),
    },
  })
);
