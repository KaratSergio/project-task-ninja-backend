import { Task } from "../../models/task.js";
import { Column } from "../../models/column.js";

import { taskSchemas } from "../../schemas/schemaTask.js";

import { HttpError } from "../../helpers/HttpError.js";
import { BadRequestError } from "../../helpers/BadRequestError.js";

const updateTask = async (req, res) => {
  const { value, error } = taskSchemas.updateTaskSchemas.validate(req.body, {
    abortEarly: false,
  });
  if (error) BadRequestError(error);

  const { id } = req.params;
  const result = await Task.findByIdAndUpdate(id, value, { new: true });
  if (!result) {
    throw HttpError(404, `Task ${id} not found`);
  }

  const { board } = await Column.findById(result.column);
  res.json({ ...result._doc, board });
};

export default updateTask;
