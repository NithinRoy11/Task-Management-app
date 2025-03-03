import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="container mt-4">
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p className="text-muted">No tasks available.</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              
              <div>
                <h5 className="mb-1">{task.title}</h5>
                <p className="mb-1 text-muted">{task.description}</p>
                <span className="badge bg-primary me-2">{task.category}</span>
                <span
                  className={`badge ${
                    task.status === "Completed" ? "bg-success" : "bg-warning"
                  } me-2`}
                >
                  {task.status}
                </span>
                <span className="badge bg-danger">{task.priority}</span>
                <p className="text-muted mt-1">Due Date: {task.due_date}</p>
              </div>

              
              <DropdownButton
                id="dropdown-basic-button"
                variant="light"
                align="end"
                title="⋮"
              >
                <Dropdown.Item onClick={() => onEdit(task.id)}>✏ Edit</Dropdown.Item>
                <Dropdown.Item onClick={() => onDelete(task.id)}>🗑 Delete</Dropdown.Item>
              </DropdownButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;