import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import TaskProgress from "../components/Tasks/TaskProgress";
import TaskList from "../components/Tasks/TaskList";
import { logout } from "../services/authService";
import {fetchTaskProgress, fetchTaskList, deleteTask, updateTask} from "../services/taskService";

const Home = () => {
  const navigate = useNavigate();

  const [taskStats, setTaskStats] = useState({
    total_tasks: 0,
    pending_tasks: 0,
    completed_tasks: 0,
    high_priority_tasks: 0,
  });

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const loadTaskStats = async () => {
      try {
        const data = await fetchTaskProgress();
        setTaskStats(data);

        const taskListData = await fetchTaskList();
        setTasks(taskListData);
      } catch (error) {
        console.error("Error fetching task progress:", error);
      }
    };

    loadTaskStats();
  }, []);

  const handleAddPost = () => {
    navigate("/add-task");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const filteredTasks = tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? task.category === selectedCategory : true) &&
      (selectedStatus ? task.status === selectedStatus : true)
    );
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdateTask = async (taskId) => {
    console.log(taskId);
    
    navigate(`/edit-task/${taskId}`);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Task Manager</h1>
        <button className="btn btn-success me-2" onClick={handleAddPost}>Add Post</button>       
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
      

      <p>Track your progress below:</p>

      <TaskProgress 
        total={taskStats.total_tasks}
        pending={taskStats.pending_tasks}
        completed={taskStats.completed_tasks}
        highPriority={taskStats.high_priority_tasks}
      />

      <div className="row my-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select className="form-control" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="Development">Development</option>
            <option value="QA">QA</option>
            <option value="DevOps">DevOps</option>
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-control" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-danger w-100" onClick={() => { setSearchQuery(""); setSelectedCategory(""); setSelectedStatus(""); }}>
            Clear Filters
          </button>
        </div>
      </div>

      <TaskList tasks={filteredTasks} onDelete={handleDeleteTask} onEdit={handleUpdateTask} />
    </div>
  );
};

export default Home;