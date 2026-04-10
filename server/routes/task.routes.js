const express = require("express");
const router = express.Router();
const controllers = require("../controllers/task.controller");
router.get("/", controllers.getAllTasks);
router.get("/:id", controllers.getTaskDetails);
module.exports = router;
