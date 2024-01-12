const { Severity, validate } = require("../models/severities");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const severities = await Severity.find().sort("name");
  res.send(severities);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let severity = new Severity({ name: req.body.name });
  severity = await severity.save();

  res.send(severity);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const severity = await Severity.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!severity)
    return res
      .status(404)
      .send("The severity with that given ID was not found.");

  res.send(severity);
});

router.delete("/:id", async (req, res) => {
  const severity = await Severity.findByIdAndRemove(req.params.id);

  if (!severity)
    return res
      .status(404)
      .send("The severity with that given ID was not found.");

  res.send(severity);
});

router.get("/:id", async (req, res) => {
  const severity = await Severity.findById(req.params.id);

  if (!severity)
    return res
      .status(404)
      .send("The severity with that given ID was not found.");

  res.send(severity);
});

module.exports = router;
