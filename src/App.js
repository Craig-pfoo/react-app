import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Tasks from "./components/tasks";
import Users from "./components/admin/users";
import NotFound from "./components/notFound";
import LoginScreen from "./components/loginScreen";
import NavBar from "./components/navBar";
import Dashboard from "./components/admin/dashboard";
import AllTasks from "./components/admin/allTasks";
import RegisterUser from "./components/registerUser";
import TaskForm from "./components/taskForm";
import "react-toastify/dist/ReactToastify.css";

class Apps extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/tasks/:id" component={TaskForm}></Route>
            <Route path="/tasks" component={Tasks}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/loginScreen" component={LoginScreen}></Route>
            <Route path="/registerUser" component={RegisterUser}></Route>
            <Route path="/admin/dashboard" component={Dashboard}></Route>
            <Route path="/admin/allTasks" component={AllTasks}></Route>
            <Route path="/admin/users" component={Users}></Route>
            <Redirect path="/" exact to="/tasks"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default Apps;
