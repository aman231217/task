const {
  err_queue,
  start_f,
  stop_f,
  task_done,
} = require("./queue");

const controlF = async (msg) => {
  if (msg.error) {
    await err_queue.add({ error: msg.error });
  } else if (msg.start) {
    await start_f.add({ pid: msg.start.process_id, id: msg.start.id });
  } else if (msg.stop) {
    await stop_f.add({ id: msg.stop.id });
  } else {
    await task_done.add({ id: msg.id });
  }
};

module.exports = {
  controlF,
};
