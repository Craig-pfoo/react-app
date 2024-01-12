import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TaskTable from "./tasksTable";
import Pagination from "./common/pagination";
import TaskGroup from "./common/taskGroup";
import PropTypes from "prop-types";
import { getSeverities } from "../services/severityService";
import { paginate } from "../utils/paginate";
import { getTasks, deleteTask } from "../services/taskService";
import _ from "lodash";

class Tasks extends Component {
  state = {
    tasks: [],
    severities: [],
    currentPage: 1,
    pageSize: 3,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getSeverities();
    const severities = [{ _id: "", name: "All Severities" }, ...data];

    const { data: tasks } = await getTasks();
    this.setState({ tasks, severities });
  }

  handleCompleted = (task) => {
    const tasks = [...this.state.tasks];
    const index = tasks.indexOf(task);
    tasks[index] = { ...tasks[index] };
    tasks[index].completed = !tasks[index].completed;
    this.setState({ tasks });
  };

  handleDelete = async (task) => {
    const originalTasks = this.state.tasks;
    const tasks = originalTasks.filter((t) => t._id !== task._id);
    this.setState({ tasks });

    try {
      await deleteTask(task._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("x");
      toast.error("This task has already been deleted.");

      this.setState({ tasks: originalTasks });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSeveritySelect = (severities) => {
    this.setState({ selectedSeverity: severities, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      selectedSeverity,
      sortColumn,
      currentPage,
      pageSize,
      tasks: allTasks,
    } = this.state;

    const filtered =
      selectedSeverity && selectedSeverity._id
        ? allTasks.filter((t) => t.severity._id === selectedSeverity._id)
        : allTasks;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const tasksPaginated = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3 mt-1">
          <TaskGroup
            tasks={this.state.severities}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleSeveritySelect}
          />
        </div>
        <div className="col">
          <Link to="/tasks/new" className="btn btn-primary mb-2">
            New Task
          </Link>
          <p>Showing {filtered.length} Tasks in the database.</p>
          <TaskTable
            tasks={tasksPaginated}
            sortColumn={sortColumn}
            onComplete={this.handleCompleted}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Tasks;
