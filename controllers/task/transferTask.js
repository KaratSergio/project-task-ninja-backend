import { Types } from "mongoose";

import { Task } from "../../models/task.js";
import { Column } from "../../models/column.js";

import { transferSchema } from "../../schemas/schemaTransfer.js";

import { BadRequestError } from "../../helpers/BadRequestError.js";

const transferTask = async (req, res) => {
  const { value, error } = transferSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) BadRequestError(error);

  const { id } = req.params;
  const { source, destination } = value;

  const taskId = new mongoose.Types.ObjectId(id);
  const columnId = new mongoose.Types.ObjectId(destination.droppableId);

  await Column.findByIdAndUpdate(source.droppableId, {
    $pull: { taskOrder: { $in: taskId } },
  });

  const { board } = await Column.findByIdAndUpdate(destination.droppableId, {
    $push: { taskOrder: { $each: [taskId], $position: destination.index } },
  });

  await Task.findByIdAndUpdate(id, { column: columnId });
  res.json({
    board,
    message: `Task position has been changed to ${destination.index} in column ${destination.droppableId}`,
  });
};

export default transferTask;
