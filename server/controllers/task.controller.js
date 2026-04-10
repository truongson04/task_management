const Task = require("../model/tasks.model");
module.exports.getAllTasks = async (req, res) => {
  try {
    const find = {
      deleted: false,
    };
    if (req.query.status) {
      find.status = req.query.status;
    }
    const tasks = await Task.find(find).select(
      "title status timeStart timeFinish",
    );

    res.json(tasks);
  } catch (error) {
    res.json({
      message: "Task cannot be found",
    });
  }
};
module.exports.getTaskDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({
      _id: id,
      deleted: false,
    });
    res.json(task);
  } catch (error) {
    res.json({
      message: "Task cannot be found",
    });
  }
};
