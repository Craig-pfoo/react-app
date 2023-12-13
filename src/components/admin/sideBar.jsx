import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/admin/allTasks">Tasks</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/admin/users">Users</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
