import BadRequestError from "../../helpers/BadRequestError.js";
import HttpError from "../../helpers/HttpError.js";

import columnSchemas from "../../schemas/schemaColumn.js";

import Column from "../../models/column.js";

const updateColumn = async (req, res) => {
  const { value, error } = columnSchemas.editColumnSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) BadRequestError(error);
  const { id } = req.params;
  const { title } = value;
  const result = await Column.findByIdAndUpdate(id, { title }, { new: true });
  if (!result) {
    throw HttpError(404, `Column ${id} not found`);
  }
  res.status(200).json(result);
};

export default updateColumn;
