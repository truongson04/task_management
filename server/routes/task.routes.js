const express = require("express");
const router = express.Router();
const controllers = require("../controllers/task.controller");
router.get("/", controllers.getAllTasks);
router.get("/:id", controllers.getTaskDetails);
router.patch("/change-status/:id", controllers.changeTaskStatus);
router.patch("/change-multi", controllers.changeMulti);
module.exports = router;
