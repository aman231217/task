const { start_queue1, stop_queue1 } = require("./queue");
const task= require("./structure/task1");

const startTask1 = () => {
  return new Promise((resolve, reject) => {
    new task({
      task: "Parsing Xlsx File",
      status: "Pending",
    })
      .save()
      .then((e) => {
        start_queue1.add({ id: e.id }).then(resolve).then(reject);
      })
      .catch((err) => reject(err));
  });
};

const stopTask1 = (id) => {
  return new Promise((resolve, reject) => {
    if (id) {
      task
        .findById(id)
        .then((e) => {
          if (e)
            stop_queue1
              .add({ id: e.id, pid: e.pid })
              .then((e) => resolve(e))
              .catch((err) => reject(err));
          else reject(new Error("Invalid Id"));
        })
        .catch((err) => reject(new Error(err)));
    } else reject(new Error("Invalid Id"));
  });
};

const getTask1 = () => {
  return new Promise((resolve, reject) => {
    task
      .find()
      .then((e) => {
        resolve(e);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

module.exports = {
  startTask1,
  stopTask1,
  getTask1,
};
