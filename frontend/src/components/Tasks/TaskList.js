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
              className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start mb-3 position-relative"
            >
              <div className="mb-3 mb-md-0">
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

              {/* Dropdown button positioned at the right for mobile */}
              <DropdownButton
                id="dropdown-basic-button"
                variant="light"
                align="end"
                title="⋮"
                className="ms-md-3 position-absolute top-0 end-0 mt-3 me-3 d-md-none"
              >
                <Dropdown.Item onClick={() => onEdit(task.id)}>✏ Edit</Dropdown.Item>
                <Dropdown.Item onClick={() => onDelete(task.id)}>🗑 Delete</Dropdown.Item>
              </DropdownButton>

              {/* Dropdown button for medium and larger screens */}
              <DropdownButton
                id="dropdown-basic-button"
                variant="light"
                align="end"
                title="⋮"
                className="ms-md-3 d-none d-md-inline-block"
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
