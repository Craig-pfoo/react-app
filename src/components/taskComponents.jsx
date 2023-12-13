import React, { Component } from "react";
import TaskTable from "./tasksTable";
import Pagination from "./common/pagination";
import TaskGroup from "./common/taskGroup";
import PropTypes from "prop-types";
import { getGenres } from "../fakeTasks/fakeGenreService";
import { paginate } from "../utils/paginate";
import { getTasks } from "../fakeTasks/fakeTaskService-1";
import _ from "lodash";

class Tasks extends Component {
  state = {
    tasks: [],
    genres: [],
    currentPage: 1,
    pageSize: 3,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Severities" }, ...getGenres()];

    this.setState({ tasks: getTasks(), genres });
  }

  handleCompleted = (task) => {
    const tasks = [...this.state.tasks];
    const index = tasks.indexOf(task);
    tasks[index] = { ...tasks[index] };
    tasks[index].completed = !tasks[index].completed;
    this.setState({ tasks });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const { selectedGenre, sortColumn, currentPage, pageSize } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? getTasks().filter((t) => t.severity._id === selectedGenre._id)
        : getTasks();

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const tasksPaginated = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <h1
          style={{ fontSize: 50, fontWeight: "bold" }}
          className="text-primary-emphasis"
        >
          Task Manager
        </h1>
        <div className="col-3 mt-1">
          <TaskGroup
            tasks={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} Tasks in the database.</p>
          <TaskTable
            tasks={tasksPaginated}
            sortColumn={sortColumn}
            onComplete={this.handleCompleted}
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
