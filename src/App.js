import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Tasks from "./components/tasks";
import Users from "./components/admin/users";
import NotFound from "./components/notFound";
import LoginScreen from "./components/loginScreen";
import NavBar from "./components/navBar";
import Dashboard from "./components/admin/dashboard";
import AllTasks from "./components/admin/allTasks";

class Apps extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/tasks" component={Tasks}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/loginScreen" component={LoginScreen}></Route>
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
