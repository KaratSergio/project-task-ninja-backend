import User from "../../models/user.js";

import HttpError from "../../helpers/HttpError.js";

import authSchema from "../../schemas/schemaAuth.js";

import BadRequestError from "../../helpers/BadRequestError.js";

const register = async (req, res) => {
  const { value, error } = authSchema.registerSchema.validate(req.body, {
    abortEarly: false,
  });
  const { name, email, password } = value;
  if (error) BadRequestError(error);

  const userEmail = await User.findOne({ email });
  if (userEmail) {
    throw HttpError(409, "Email has already in use");
  }
  const result = await User.create({ name, email, password });

  res.status(201).json(result);
};

export default register;
