const { start_queue1 } = require("./queue");
const { doTask1 } = require("./task1");

start_queue1.process(async (job) => {
  await doTask1("./task1.csv", job.data.id);
});
