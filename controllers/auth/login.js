import User from "../../models/user.js";

import HttpError from "../../helpers/HttpError.js";

import authSchemas from "../../schemas/schemaAuth.js";

import BadRequestError from "../../helpers/BadRequestError.js";

const login = async (req, res) => {
  const { value, error } = authSchemas.loginSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) BadRequestError(error);

  const { email, password } = value;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Email is wrong");

  if (!user.comparePassword(password)) {
    throw HttpError(401, "Password is wrong");
  }

  const accessToken = user.signToken();

  await User.findOneAndUpdate({ email }, { accessToken });
  res.json({
    accessToken,
    user: {
      name: user.name,
      email: user.email,
      theme: user.theme,
      avatarURL: user.avatarURL,
    },
  });
};

export default login;
