import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Tasks from "./components/tasks";
import Users from "./components/admin/users";
import NotFound from "./components/notFound";
import LoginScreen from "./components/loginScreen";
import Logout from "./components/logout";
import NavBar from "./components/navBar";
import Dashboard from "./components/admin/dashboard";
import AllTasks from "./components/admin/allTasks";
import RegisterUser from "./components/registerUser";
import TaskForm from "./components/taskForm";
import ProtectedRoute from "./components/common/protectedRoute";
import Profile from "./components/common/profile";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";

class Apps extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <ProtectedRoute path="/tasks/:id" component={TaskForm} />
            <Route
              path="/tasks"
              render={(props) => <Tasks {...props} user={user} />}
            ></Route>
            <Route path="/not-found" component={NotFound} />
            <Route path="/loginScreen" component={LoginScreen} />
            <Route path="/logout" component={Logout} />
            <Route path="/registerUser" component={RegisterUser} />
            <Route path="/profile" component={Profile} />
            <Route path="/admin/dashboard" component={Dashboard} />
            <Route path="/admin/allTasks" component={AllTasks} />
            <Route path="/admin/users" component={Users} />
            <Redirect path="/" exact to="/tasks"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default Apps;
