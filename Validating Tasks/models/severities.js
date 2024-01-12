const Joi = require("joi");
const mongoose = require("mongoose");

const severitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Severity = mongoose.model("Severity", severitySchema);

function validateSeverity(severity) {
  const sevSchema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });
  return sevSchema.validate(severity);
}

module.exports.severitySchema = severitySchema;
module.exports.Severity = Severity;
module.exports.validate = validateSeverity;
