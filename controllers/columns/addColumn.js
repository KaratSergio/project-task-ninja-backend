import BadRequestError from "../../helpers/BadRequestError.js";

import columnSchemas from "../../schemas/schemaColumn.js";

import Column from "../../models/column.js";
import Board from "../../models/board.js";

const addColumn = async (req, res) => {
  const { value, error } = columnSchemas.addColumnSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) BadRequestError(error);
  const { board } = value;
  const result = await Column.create({ ...value });
  await Board.findByIdAndUpdate(board, { $push: { columnOrder: result._id } });
  res.status(201).json(result);
};

export default addColumn;
