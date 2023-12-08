import React from "react";

const TaskCompleted = (props) => {
  let successButton = "btn btn-primary";
  if (!props.complete) successButton += "btn btn-danger";
  return (
    <button onClick={props.onClick} className={successButton}>
      &#10003;
    </button>
  );
};

export default TaskCompleted;
