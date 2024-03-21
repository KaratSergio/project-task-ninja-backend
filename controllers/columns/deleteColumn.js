import HttpError from "../../helpers/HttpError.js";

import Column from "../../models/column.js";
import Board from "../../models/board.js";
import Task from "../../models/task.js";

const deleteColumn = async (req, res) => {
  const { id } = req.params;
  const result = await Column.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, `Column ${id} not found`);
  }
  if (result.taskOrder.length !== 0) {
    await Task.deleteMany({ _id: { $in: result.taskOrder } });
  }
  await Board.findByIdAndUpdate(result.board, {
    $pull: { columnOrder: result > _id },
  });
  res.status(200).json({
    message: `Column ${id} deleted successfully`,
    data: result,
  });
};

export default deleteColumn;
