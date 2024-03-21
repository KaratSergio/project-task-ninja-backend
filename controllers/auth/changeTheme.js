import User from "../../models/user.js";

import authSchema from "../../schemas/schemaAuth.js";

import BadRequestError from "../../helpers/BadRequestError.js";

const changeTheme = async (req, res, next) => {
  const { user } = req;
  const { value, error } = authSchema.updateTheme.validate(req.body, {
    abortEarly: false,
  });
  if (error) BadRequestError(error);

  await User.findOneAndUpdate({ _id: user._id }, value);
  res.json({ message: "Theme changed" });
};

export default changeTheme;
