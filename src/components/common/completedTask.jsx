import React, { Component } from "react";

class TaskCompleted extends Component {
  render() {
    let successButton = "btn btn-success";
    if (!this.props.complete) successButton += "btn btn-danger";
    return (
      <button onClick={this.props.onClick} className={successButton}>
        &#10003;
      </button>
    );
  }
}

export default TaskCompleted;
