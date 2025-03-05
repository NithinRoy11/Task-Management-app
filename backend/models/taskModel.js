const db = require("../config/db");

exports.createTask = async (userId, taskData) => {
  const { title, description, category, status, priority, due_date } = taskData;
  const [result] = await db.query(
    "INSERT INTO tasks (user_id, title, description, category, status, priority, due_date) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [userId, title, description, category, status, priority, due_date]
  );
  return result.insertId;
};

exports.getAllTasks = async (userId) => {
  const [tasks] = await db.query("SELECT * FROM tasks WHERE user_id = ?", [userId]);
  return tasks;
};

exports.getTaskById = async (taskId) => {
  // console.log("taskId", taskId);
  
  const [task] = await db.query("SELECT * FROM tasks WHERE id = ?", [taskId]);
  return task[0];
};

exports.updateTask = async ( taskId, updates) => {
  const { title, description, category, status, priority, due_date } = updates;
  await db.query(
    "UPDATE tasks SET title = ?, description = ?, category = ?, status = ?, priority = ?, due_date = ? WHERE id = ? ",
    [title, description, category, status, priority, due_date, taskId]
  );
};


exports.deleteTask = async ( taskId) => {
  await db.query("DELETE FROM tasks WHERE id = ? ", [taskId]);
};

exports.getFilteredTasks = async (userId, category, status, search) => {
  try {
    // console.log("Received User ID:", userId); 
    // console.log("Category received:", category); 

    let query = "SELECT * FROM tasks WHERE user_id = ?";
    let queryParams = [userId];

    if (category) {
      query += " AND category = ?";
      queryParams.push(category);
    }
    if (status) {
      query += " AND status = ?";
      queryParams.push(status);
    }
    if (search) {
      query += " AND title LIKE ?";
      queryParams.push(`%${search}%`);
    }

    // console.log("Final Query:", query); 
    // console.log("Query Parameters:", queryParams); 

    const [tasks] = await db.query(query, queryParams);

    if (tasks.length === 0) {
      return []; //  Return an empty array instead of res.json
    }

    return tasks;
  } catch (error) {
    console.error("Error in getFilteredTasks:", error);
    throw error;
  }
};


// dashboARD

exports.getDashboardSummary = async (userId) => {
  try {
    const queryTotal = "SELECT COUNT(*) AS total_tasks FROM tasks WHERE user_id = ?";
    const queryPending = "SELECT COUNT(*) AS pending_tasks FROM tasks WHERE user_id = ? AND status = 'pending'";
    const queryCompleted = "SELECT COUNT(*) AS completed_tasks FROM tasks WHERE user_id = ? AND status = 'completed'";
    const queryHighPriority = "SELECT COUNT(*) AS high_priority_tasks FROM tasks WHERE user_id = ? AND priority = 'high'";

    const [[totalTasks]] = await db.query(queryTotal, [userId]);
    const [[pendingTasks]] = await db.query(queryPending, [userId]);
    const [[completedTasks]] = await db.query(queryCompleted, [userId]);
    const [[highPriorityTasks]] = await db.query(queryHighPriority, [userId]);

    return {
      total_tasks: totalTasks.total_tasks || 0,
      pending_tasks: pendingTasks.pending_tasks || 0,
      completed_tasks: completedTasks.completed_tasks || 0,
      high_priority_tasks: highPriorityTasks.high_priority_tasks || 0,
    };
  } catch (error) {
    console.error("Error in getDashboardSummary:", error);
    throw error;
  }
};