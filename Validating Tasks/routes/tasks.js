const { Task, validate } = require("../models/tasks");
const { Severity } = require("../models/severities");
const express = require("express");
const Joi = require("joi");
const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await Task.find().sort("name");
  res.send(tasks);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const severity = await Severity.findById(req.body.severity);
  if (!severity) return res.status(400).send("invalid Severity.");

  let task = new Task({
    title: req.body.title,
    task: req.body.task,
    category: req.body.category,
    severity: {
      _id: severity._id,
      name: severity.name,
    },
  });
  task = await task.save();

  res.send(task);
});

router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).send("Task not found");
  }
  res.send(task);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  const severity = await Severity.findById(req.body.severity);
  if (!severity) return res.status(400).send("invalid Severity.");

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { task: req.body.task },
    {
      new: true,
    }
  );

  if (!task) {
    return res.status(404).send({ error: "Task not found" });
  }
  res.send(task);
});

router.delete("/:id", async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);

  if (!task) {
    return res.status(404).send({ error: "Task not found" });
  }
  res.send(task);
});

module.exports = router;
