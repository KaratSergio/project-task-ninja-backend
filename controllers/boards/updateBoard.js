import { Board } from "../../models/board.js";

import { boardSchemas } from "../../schemas/schemaBoard.js";

import { HttpError } from "../../helpers/HttpError.js";
import { BadRequestError } from "../../helpers/BadRequestError.js";

const updateBoard = async (req, res) => {
  const { value, error } = boardSchemas.editBoardSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) BadRequestError(error);
  const { id } = req.params;
  const result = await Board.findByIdAndUpdate(id, value, { new: true });
  if (!result) {
    throw HttpError(404, `Board ${id} is not found`);
  }
  res.json(result);
};

export default updateBoard;
