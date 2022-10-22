const {
  start_f,
  stop_f,
  err_queue,
  task_done,
} = require("./queue");
const task1 = require("./structure/task1");

start_f.process((job) => {
  task1
    .findByIdAndUpdate(job.data.id, {
      $set: {
        pid: job.data.pid,
        status: "Running",
      },
    })
    .then()
    .catch((err) => console.log({ err }));
});

stop_f.process((job) => {
  console.log(job.data.id);
  task1
    .findByIdAndUpdate(job.data.id, {
      $set: {
        status: "terminated",
      },
    })
    .then((e) => console.log(`Job Stopped ${job.data.id}`))
    .catch((err) => console.log({ err }));
});

task_done.process((job) => {
  task1
    .findByIdAndUpdate(job.data.id, {
      $set: {
        status: "task completed",
      },
    })
    .then(() => console.log("Job completed"))
    .catch((err) => console.log({ err }));
});

err_queue.process((job) => {
  console.log(job.data.error);
  task1
    .findByIdAndUpdate(job.data.id, {
      $set: {
        status: `error:${job.data.error}`,
      },
    })
    .then()
    .catch((err) => console.log(err));
});
