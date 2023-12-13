import React from "react";
import { Route } from "react-router-dom";
import SideBar from "./sideBar";
import Users from "./users";
import AllTasks from "./allTasks";

const Dashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <SideBar />
      <Route path="./admin/users" component={Users} />
      <Route path="./admin/allTasks" component={AllTasks} />
    </div>
  );
};

export default Dashboard;
