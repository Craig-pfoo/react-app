import React, { Component } from "react";
import { getTasks } from "../fakeTasks/fakeTaskService-1";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import Task from "./taskComponents";

class Apps extends Component {
  state = {
    tasks: getTasks(),
    currentPage: 1,
    pageSize: 2,
  };

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

  render() {
    const tasks = paginate(
      this.state.tasks,
      this.state.currentPage,
      this.state.pageSize
    );

    return (
      <div className="container">
        <Task tasks={tasks} onClick={this.handleCompleted} />
        <Pagination
          itemCount={this.state.tasks.length}
          pageSize={this.state.pageSize}
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        />
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

export default Apps;
