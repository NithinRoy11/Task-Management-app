import React from "react";

const TaskProgress = ({ total, pending, completed, highPriority }) => {
  return (
    <div className="container mt-4">
      <h2>Task Progress</h2>
      <div className="row">
        <div className="col-md-3">
          <div className="card text-center p-3 bg-primary text-white">
            <h4>Total Tasks</h4>
            <h2>{total}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 bg-warning text-dark">
            <h4>Pending Tasks</h4>
            <h2>{pending}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 bg-success text-white">
            <h4>Completed Tasks</h4>
            <h2>{completed}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 bg-danger text-white">
            <h4>High Priority</h4>
            <h2>{highPriority}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskProgress;