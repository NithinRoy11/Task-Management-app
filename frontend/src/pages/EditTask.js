import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTaskById, updateTask } from "../services/taskService";

const EditTask = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loadTask = async () => {
      try {
        const task = await fetchTaskById(id);
        setTaskData(task);
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTask();
  }, [id]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateTask(id, taskData);
      navigate("/home"); 
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (loading) {
    return <div className="container mt-5"><h3>Loading Task...</h3></div>;
  }

  if (!taskData) {
    return <div className="container mt-5"><h3>Task not found.</h3></div>;
  }

  return (
    <div className="container mt-5">
      <h2>Edit Task</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" name="title" value={taskData.title} onChange={handleChange} className="form-control my-2" placeholder="Task Title" required />
        <textarea name="description" value={taskData.description} onChange={handleChange} className="form-control my-2" placeholder="Task Description"></textarea>

        <select name="category" value={taskData.category} onChange={handleChange} className="form-control my-2">
          <option value="">Select Category</option>
          <option value="Tech">Tech</option>
          <option value="Development">Development</option>
          <option value="QA">QA</option>
          <option value="DevOps">DevOps</option>
        </select>

        <select name="status" value={taskData.status} onChange={handleChange} className="form-control my-2">
          <option value="">Select Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <select name="priority" value={taskData.priority} onChange={handleChange} className="form-control my-2">
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input type="date" name="due_date" value={taskData.due_date.split("T")[0]} onChange={handleChange} className="form-control my-2" required />

        <button type="submit" className="btn btn-primary w-100">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;