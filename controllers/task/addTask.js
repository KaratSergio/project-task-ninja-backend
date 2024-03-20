import { Task } from "../../models/task.js";
import { Column } from "../../models/column.js";

import { taskSchemas } from "../../schemas/schemaTask.js";

import { BadRequestError } from "../../helpers/BadRequestError.js";

const addTask = async (req, res) => {
  const { value, error } = taskSchemas.addTaskSchema.validate(req.body, {
    abortEarly: false,
  });
};

export default addTask;
