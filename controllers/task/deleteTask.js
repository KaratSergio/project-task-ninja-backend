import { Task } from "../../models/task.js";
import Column from "../../models/column.js";

import HttpError from "../../helpers/HttpError.js";

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, `Task ${id} not found`);
  }

  const { board } = await Column.findByIdAndUpdate(result.column, {
    $pull: { taskOrder: result._id },
  });
  result.board = board;
  res.status(200).json({
    message: `Task ${id} deleted successfully`,
    data: { ...result._doc, board },
  });
};

export default deleteTask;
