import HttpError from "../../helpers/HttpError.js";

import Task from "../../models/task.js";
import Board from "../../models/board.js";
import Column from "../../models/column.js";

const deleteBoard = async (req, res) => {
  const { id } = req.params;
  const result = await Board.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, `Board ${id} not found`);
  }

  if (result.columnOrder.length !== 0) {
    result.columnOrder.forEach(async (columnId) => {
      const { taskOrder } = await Column.findByIdAndRemove(columnId);
      if (taskOrder.length !== 0) {
        await Task.deleteMany({ _id: { $in: taskOrder } });
      }
    });
  }
  res.status(200).json({
    message: `Boasrd ${id} deleted successfully`,
    data: result,
  });
};

export default deleteBoard;
