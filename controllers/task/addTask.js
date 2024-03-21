import { Task } from "../../models/task.js";
import Column from "../../models/column.js";

import taskSchemas from "../../schemas/schemaTask.js";

import BadRequestError from "../../helpers/BadRequestError.js";

const addTask = async (req, res) => {
  const { value, error } = taskSchemas.addTaskSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) BadRequestError(error);

  const { column } = value;
  const result = await Task.create({ ...value });

  const { board } = await Column.findByIdAndUpdate(column, {
    $push: { taskOrder: result._id },
  });
  res.status(201).json({ ...result._doc, board });
};

export default addTask;
