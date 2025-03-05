import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskProgress from "../components/Tasks/TaskProgress";
import TaskList from "../components/Tasks/TaskList";
import { logout } from "../services/authService";
import { fetchTaskProgress, fetchTaskList, deleteTask } from "../services/taskService";
import { FaBars } from "react-icons/fa"; // Import hamburger icon

const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  const [taskStats, setTaskStats] = useState({
    total_tasks: 0,
    pending_tasks: 0,
    completed_tasks: 0,
    high_priority_tasks: 0,
  });

  const [tasks, setTasks] = useState([]);
  const [finalTask, setFinalTask] = useState(tasks);

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

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory ? task.category === selectedCategory : true) &&
        (selectedStatus ? task.status === selectedStatus : true)
      );
    });

    setFinalTask(filteredTasks);
  }, [tasks, searchQuery, selectedStatus, selectedCategory]);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
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
    navigate(`/edit-task/${taskId}`);
  };

  return (
    <div className="container mt-5 px-2 px-md-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
        <h1 className="mb-0">Task Manager</h1>

        {/* Desktop View Buttons */}
        <div className="d-none d-md-flex gap-2">
          <button className="btn btn-success" onClick={handleAddPost}>
            Add Task
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Mobile View Hamburger Menu */}
        <div className="d-md-none">
          <button className="btn btn-light border" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaBars size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="d-md-none mt-2 text-center">
          <button className="btn btn-success w-100 mb-2" onClick={handleAddPost}>
            Add Task
          </button>
          <button className="btn btn-danger w-100" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      <p className="px-3">Track your progress below:</p>

      <TaskProgress
        total={taskStats.total_tasks}
        pending={taskStats.pending_tasks}
        completed={taskStats.completed_tasks}
        highPriority={taskStats.high_priority_tasks}
      />

      {/* Filter Section */}
      <div className="row my-4">
        <div className="col-12 col-sm-6 col-md-3 mb-3 mb-md-0">
          <input
            type="text"
            className="form-control p-3"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-3 mb-3 mb-md-0">
          <select
            className="form-control p-3"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="Development">Development</option>
            <option value="QA">QA</option>
            <option value="DevOps">DevOps</option>
          </select>
        </div>
        <div className="col-12 col-sm-6 col-md-3 mb-3 mb-md-0">
          <select
            className="form-control p-3"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="col-12 col-md-3">
          <button
            className="btn btn-danger w-100 p-3"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("");
              setSelectedStatus("");
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <TaskList tasks={finalTask} onDelete={handleDeleteTask} onEdit={handleUpdateTask} />
    </div>
  );
};

export default Home;