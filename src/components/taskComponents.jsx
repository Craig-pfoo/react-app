import React, { Component } from "react";
import TaskCompleted from "./common/completedTask";

class Task extends Component {
  render() {
    return (
      <React.Fragment>
        <h1
          style={{ fontSize: 50, fontWeight: "bold" }}
          className="text-success-emphasis"
        >
          Task Manager
        </h1>
        <table className="table table-secondary table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Task</th>
              <th>Category</th>
              <th>Severity</th>
              <th>Completed</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.task}</td>
                <td>{task.category}</td>
                <td>{task.severity.name}</td>
                <td>{task.completed}</td>
                <td>
                  <TaskCompleted
                    complete={task.completed}
                    onClick={() => this.props.onClick(task)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success btn-sm">Add Task</button>
      </React.Fragment>
    );
  }
}

export default Task;
