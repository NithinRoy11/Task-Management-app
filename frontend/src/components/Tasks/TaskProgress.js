import React from "react";

const TaskProgress = ({ total, pending, completed, highPriority }) => {
  return (
    <div className="container mt-4">
      <h2>Task Progress</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
  <div className="col">
    <div className="card text-center p-3 bg-primary text-white d-flex align-items-center justify-content-center h-100">
      <h4>Total Tasks</h4>
      <h2>{total}</h2>
    </div>
  </div>
  <div className="col">
    <div className="card text-center p-3 bg-warning text-dark d-flex align-items-center justify-content-center h-100">
      <h4>Pending Tasks</h4>
      <h2>{pending}</h2>
    </div>
  </div>
  <div className="col">
    <div className="card text-center p-3 bg-success text-white d-flex align-items-center justify-content-center h-100">
      <h4>Completed Tasks</h4>
      <h2>{completed}</h2>
    </div>
  </div>
  <div className="col">
    <div className="card text-center p-3 bg-danger text-white d-flex align-items-center justify-content-center h-100">
      <h4>High Priority</h4>
      <h2>{highPriority}</h2>
    </div>
  </div>
</div>

    </div>
  );
};

export default TaskProgress;
