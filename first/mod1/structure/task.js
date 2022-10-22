const mongoosedb = require("mongoose");
module.exports = mongoosedb.model(
  "task",
  new mongoosedb.Schema({
    task: String,
    pid: String,
    status: String,
    timestamp: {
      type: Date,
      default: Date.now(),
    },
  })
);
