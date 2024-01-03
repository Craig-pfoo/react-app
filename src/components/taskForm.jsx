import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getTask, saveTask } from "../fakeTasks/fakeTaskService-1";
import { getGenres } from "../fakeTasks/fakeGenreService";

class TaskForm extends Form {
  state = {
    data: {
      title: "",
      task: "",
      category: "",
      severity: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    task: Joi.string().required().label("Task"),
    category: Joi.string().required().label("Category"),
    severity: Joi.string().required().label("Severity"),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const taskId = this.props.match.params.id;
    if (taskId === "new") return;

    const task = getTask(taskId);
    if (!task) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(task) });
  }
  mapToViewModel(task) {
    return {
      _id: task._id,
      title: task.title,
      category: task.category,
      severity: task.severity._id,
    };
  }

  doSubmit = () => {
    saveTask(this.state.data);

    this.props.history.push("/tasks");
  };

  render() {
    return (
      <div>
        <h1>Task Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("task", "Task")}
          {this.renderInput("category", "Category")}
          {this.renderSelect("severity", "Severity", this.state.genres)}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default TaskForm;
