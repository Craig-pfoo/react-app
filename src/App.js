import React, { Component } from "react";
import Tasks from "./components/taskComponents";

class Apps extends Component {
  render() {
    return (
      <main className="container">
        <Tasks />
      </main>
    );
  }
}

export default Apps;
