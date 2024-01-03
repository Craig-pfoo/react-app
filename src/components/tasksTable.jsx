import React, { Component } from "react";
import { Link } from "react-router-dom";
import TableHeader from "./common/tableHeader";
import TaskCompleted from "./common/completedTask";
import TableBody from "./common/tableBody";

class TaskTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (task) => <Link to={`/tasks/${task._id}`}>{task.title}</Link>,
    },
    { path: "task", label: "Task" },
    { path: "category", label: "Category" },
    { path: "severity.name", label: "Severity" },
    {
      path: "completed",
      label: "Completed",
      key: "completed",
      content: (task) => (
        <TaskCompleted
          complete={task.completed}
          onClick={() => this.props.onComplete(task)}
        />
      ),
    },
  ];

  render() {
    const { tasks, onSort, sortColumn } = this.props;

    return (
      <table className="table table-secondary table-striped">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody columns={this.columns} data={tasks} />
      </table>
    );
  }
}

export default TaskTable;
