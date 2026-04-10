const mongoose = require("mongoose");
module.exports.connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      dbName: "Task_management",
    });
    console.log("Database connect successfully !!");
  } catch (error) {
    console.log(error);
  }
};
