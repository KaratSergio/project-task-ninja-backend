import User from "../../models/user.js";

import authSchema from "../../schemas/schemaAuth.js";

import uploadToCloud from "../../helpers/uploadToCloud.js";

import BadRequestError from "../../helpers/BadRequestError.js";

import { hashPasswordMiddleware } from "../../helpers/hashPassword.js";

const updateUser = async (req, res) => {
  const { _id, email: oldEmail, name: oldName } = req.user;
  const { value, error } = authSchema.updateSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) BadRequestError(error);

  const { name = oldName, email = oldEmail } = value;
  const updatedUser = { name };

  if (req.file) {
    updatedUser.avatarURL = await uploadToCloud(req);
  }

  if (password) {
    updatedUser.password = await hashPasswordMiddleware(password);
    updatedUser.accessToken = "";
    res.status(204).json();
  }

  if (email && email !== oldEmail) {
    updatedUser.email = email;
    updatedUser.accessToken = "";
    res.status(204).json();
  }

  const result = await User.findByIdAndUpdate(_id, updatedUser, {
    new: true,
    select: "name email theme avatarURL -_id",
  });
  res.json(result);
};

export default updateUser;
