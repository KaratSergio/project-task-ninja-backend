import { BadRequestError } from "../../helpers/BadRequestError.js";
import { HttpError } from "../../helpers/HttpError.js";

import { boardSchemas } from "../../schemas/schemaBoard.js";

import { Board } from "../../models/board.js";
import { User } from "../../models/user.js";

const removeUser = async (req, res) => {
  const { value, error } = boardSchemas.ownerSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) BadRequestError(error);
  const { email } = value;
  const { id } = req.params;

  const user = await User.findOne({ email });
  if (!user) throw HttpError(400, "User does not exist");

  const board = await Board.findById(id);
  if (!board.owners.includes(user._id)) {
    throw HttpError(400, `User ${user.email} is not working with board ${id}`);
  }
  if (board.owners.length < 2) {
    throw HttpError(
      409,
      `User ${user.email} is the latest owner of the board ${id}. It's preferable to delete the board instead of this action`
    );
  }
  await Board.findByIdAndUpdate(id, { $pull: { owners: user._id } });
  res.json({
    message: `User ${user.email} has successfully disconnected from board ${id}`,
  });
};

export default removeUser;
