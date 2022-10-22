const Queue = require("bull");
const redis_url1 = process.env.broker_url;

module.exports = {
  start_queue1: new Queue("start", redis_url1),
  stop_queue1: new Queue("stop", redis_url1),
  start_f: new Queue("start_f", redis_url1),
  stop_f: new Queue("stop_f", redis_url1),
  err_queue: new Queue("err_feedback", redis_url1),
  task_done: new Queue("task_done", redis_url1),
};
