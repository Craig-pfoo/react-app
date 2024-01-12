const mongoose = require("mongoose");
const { severitySchema } = require("./severities");
const Joi = require("joi");

const Task = mongoose.model(
  "Tasks",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    task: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    severity: {
      type: severitySchema,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  })
);

function validateTasks(task) {
  const taskSchema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    task: Joi.string().required().max(50),
    category: Joi.string().required(),
    severity: Joi.string().hex().length(24).required(),
    completed: Joi.boolean().default(false),
  });
  return taskSchema.validate(task);
}

module.exports.Task = Task;
module.exports.validate = validateTasks;
