import Joi from "joi";
import objectId from "joi-objectid";

import { deadline } from "../constants/regExp.js";
import { priorities } from "../constants/array.js";

Joi.objectId = objectId(Joi);

const priorityValidator = (value, helpers) => {
  if (!priorities.includes(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

const addTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string()
    .custom(priorityValidator, "Custom validation for priority")
    .required(),
  deadline: Joi.string().pattern(deadline).allow(null),
  column: Joi.objectId().required(),
});

const editTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  priority: Joi.string().custom(
    priorityValidator,
    "Custom validation for priority"
  ),
  deadline: Joi.string().pattern(deadline).allow(null),
});

const taskSchemas = { addTaskSchema, editTaskSchema };

export default taskSchemas;
