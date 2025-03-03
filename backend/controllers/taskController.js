const taskModel = require("../models/taskModel");

exports.createTask = async (req, res) => {
  try {
    const taskId = await taskModel.createTask(req.user.id, req.body);
    res.status(201).json({ message: "Task created successfully", task: { id: taskId, ...req.body } });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getAllTasks(req.user.id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    // console.log("getTaskById", req.params.id);
    
    const task = await taskModel.getTaskById( req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    await taskModel.updateTask( req.params.id, req.body);
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await taskModel.deleteTask( req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// filter 
exports.filterTasks = async (req, res) => {
  try {
    const { category, status, search } = req.query; // Get query params

    console.log("🔍 Debugging filterTasks:");
    console.log("User ID:", req.user?.id);
    console.log("Category:", category);
    console.log("Status:", status);
    console.log("Search:",search);

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User ID missing in token" });
    }

    
    
    const tasks = await taskModel.getFilteredTasks(req.user.id, category, status, search);
    console.log(req.user.id);

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error filtering tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//dashboard

exports.dashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const summary = await taskModel.getDashboardSummary(userId);

    res.status(200).json(summary);
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};