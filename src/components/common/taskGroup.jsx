import React from "react";

const TaskGroup = (props) => {
  const { tasks, textProperty, valuePoperty, selectedItem, onItemSelect } =
    props;

  console.log("Tasks:", tasks);

  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <li
          onClick={() => onItemSelect(task)}
          key={task[valuePoperty]}
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
