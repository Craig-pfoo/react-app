import React, { Component } from "react";
import { getTasks } from "../fakeTasks/fakeTaskService-1";
import Task from "./taskComponents";

class Apps extends Component {
  state = {
    tasks: getTasks(),
  };

  handleCompleted = (task) => {
    const tasks = [...this.state.tasks];
    const index = tasks.indexOf(task);
    tasks[index] = { ...tasks[index] };
    tasks[index].completed = !tasks[index].completed;
    this.setState({ tasks });
  };

  render() {
    return (
      <main className="container">
        <Task tasks={this.state.tasks} onClick={this.handleCompleted} />
      </main>
    );
  }
}

export default Apps;
