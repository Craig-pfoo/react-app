import React from "react";

const TaskGroup = (props) => {
  const { tasks, textProperty, valueProperty, selectedItem, onItemSelect } =
    props;

  console.log("Tasks:", tasks);

  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <li
          onClick={() => onItemSelect(task)}
          key={task[valueProperty]}
          className={
            task === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {task[textProperty]}
        </li>
      ))}
    </ul>
  );
};

TaskGroup.defaultProps = {
  textProperty: "name",
  valuePoperty: "_id",
};

export default TaskGroup;
