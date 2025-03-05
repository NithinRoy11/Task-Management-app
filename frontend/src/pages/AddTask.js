import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addTask } from "../services/taskService";

const AddTask = () => {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "",
    status: "To Do",
    priority: "Low",
    due_date: new Date(),
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setTask({ ...task, due_date: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTask({
        ...task,
        due_date: task.due_date.toISOString().split("T")[0],
      });
      navigate("/home");
    } catch (error) {
      setError("Failed to add task. Try again.");
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-light shadow-sm px-4 py-2 rounded-pill fw-bold mb-3" onClick={() => navigate("/home")}>
      ← Back
      </button>
      <h2>Add Task</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="form-control my-2"
          placeholder="Task Title"
          required
        />
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          className="form-control my-2"
          placeholder="Task Description"
          required
        ></textarea>
        <select
          name="category"
          value={task.category}
          onChange={handleChange}
          className="form-control my-2">
          <option value="">Select Category</option>
          <option value="Tech">Tech</option>
          <option value="Development">Development</option>
          <option value="QA">QA</option>
          <option value="DevOps">DevOps</option>
        </select>

        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="form-control my-2">
          <option value="">Select Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="form-control my-2"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <DatePicker
          selected={task.due_date}
          onChange={handleDateChange}
          className="form-control my-2"
          dateFormat="yyyy-MM-dd"
        />
        <button type="submit" className="btn btn-success w-100">Save Task</button>
      </form>
    </div>
  );
};

export default AddTask;