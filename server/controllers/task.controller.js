const Task = require("../model/tasks.model");
module.exports.getAllTasks = async (req, res) => {
  try {
    const find = {
      deleted: false,
    };
    if (req.query.status) {
      find.status = req.query.status;
    }
    // sort (quy định front end gửi lên theo cấu trúc sortKey và sortValue ở query)
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;
    }
    // các query thường có trên url
    let skipPagination = 0;
    let limitPagination = 0;
    let keyword = "";

    if (parseInt(req.query.page)) {
      if (parseInt(req.query.limit)) {
        limitPagination = parseInt(req.query.limit);
        skipPagination = (parseInt(req.query.page) - 1) * limitPagination;
      } else {
        skipPagination = (parseInt(req.query.page) - 1) * 3;
      }
    }
    if (req.query.keyword) {
      keyword = req.query.keyword;
      const regex = new RegExp(keyword, "i");
      find.title = regex;
    }

    const tasks = await Task.find(find)
      .select("title status timeStart timeFinish")
      .sort(sort)
      .limit(limitPagination)
      .skip(skipPagination);

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
module.exports.changeTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await Task.updateOne(
      {
        _id: id,
      },
      {
        status: status,
      },
    );
    return res.status(200).json({ message: "Updated successfully !!" });
  } catch (error) {
    return res.status(400).json({ message: "Failed to update" });
  }
};
// server nhận danh sách ids, key cần thay đổi và giá trị thay đổi
module.exports.changeMulti = async (req, res) => {
  const { ids, key, value } = req.body;
  try {
    switch (key) {
      case "status":
        await Task.updateMany(
          {
            _id: { $in: ids },
          },
          {
            status: value,
          },
        );
        break;
      default:
        return res.status(400).json({ message: "Check your value again" });
    }
    return res.status(200).json({ message: "Updated successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to update!!" });
  }
};
