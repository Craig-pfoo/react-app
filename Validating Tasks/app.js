const mongoose = require("mongoose");
const Joi = require("joi");
const TestApplication = require("./middleware/logger");
const tasks = require("./routes/tasks");
const severities = require("./routes/severities");
const express = require("express");
const app = express();
const fs = require("fs");

mongoose
  .connect("mongodb://0.0.0.0:27017/task-manager")
  .then(() => console.log("Connected to MongoDB..."));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.json());
app.use("/api/tasks", tasks);
app.use("/api/severities", severities);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

const testApplication = new TestApplication();
testApplication.on("loadApplication", (message) => {
  fs.appendFile("./logger.txt", "Application loaded!\n", (error) => {
    if (error) {
      console.error(
        "Error occurred while appending to logger.txt:",
        error.message
      );
    } else {
      console.log("Finished!");
    }
  });
});

testApplication.loadApplication("Application is loading...");
