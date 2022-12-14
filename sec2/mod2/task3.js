const csv1 = require("csv-parser");
const fs1 = require("fs");
const task3 = require("./structure2/task1");
const mongoose = require("mongoose");

const doTask1 = (file, id) => {
  return new Promise((resolve, reject) => {
    console.log(`task ${id} starting ########`);

    //Starting interrupt
    try {
      process.send({ start: { process_id: process.pid, id } });
    } catch (e) {
      return reject(e);
    }

    mongoose.startSession().then((session) => {
      session.startTransaction();

      fs1.createReadStream(file)
        .pipe(csv())
        .on("data", (row) => {
          new task({
            taskId: id,
            processId: process.pid,
            o: row,
          })
            .save()
            .then((e) => {
              console.log("row added");
            })
            .catch((err) => {
              try {
                process.send({ error: new Error(err) });
              } catch (e) {
                return reject(e);
              }
              session
                .abortTransaction()
                .then(() => {
                  process.exit(0);
                  resolve();
                })
                .catch((err) => {
                  process.exit(0);
                  return reject(err);
                });
            });
        })
        .on("end", () => {
          session
            .commitTransaction()
            .then(() => {
              try {
                process.send({ id });
              } catch (e) {
                return reject(e);
              }
              return resolve();
            })
            .catch((e) => reject(e));
        })
        .on("error", (err) => {
          try {
            process.send({ error: new Error(err) });
          } catch (e) {
            return reject(e);
          }
          return reject(err);
        });
    });
  });
};

module.exports = {
  doTask1,
};
