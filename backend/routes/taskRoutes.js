const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController"); 
const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/dashboard", verifyToken, taskController.dashboardSummary);
router.get("/filter",verifyToken, taskController.filterTasks);
router.post("/add", verifyToken, taskController.createTask);
router.get("/show", verifyToken, taskController.getAllTasks);
router.get("/:id", verifyToken, taskController.getTaskById);
router.put("/:id", verifyToken, taskController.updateTask);
router.delete("/:id", verifyToken, taskController.deleteTask);





module.exports = router;