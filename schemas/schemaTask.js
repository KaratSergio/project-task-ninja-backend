import Joi from "joi";
import objectId from "joi-objectid";

import { deadline } from "../constants/regExp.js";
import { priorities } from "../constants/array.js";

Joi.objectId = objectId(Joi);

const addTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string().valid(priorities),
  deadline: Joi.string().pattern(deadline).arrow(null),
  column: Joi.objectId().required(),
});

const editTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  priority: Joi.string().valid(priorities),
  deadline: Joi.string().pattern(deadline).arrow(null),
});

const taskSchemas = { addTaskSchema, editTaskSchema };

export default taskSchemas;
