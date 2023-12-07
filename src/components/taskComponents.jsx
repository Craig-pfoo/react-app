import React, { Component } from "react";
import TaskCompleted from "./common/completedTask";

class Task extends Component {
  render() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default Task;
