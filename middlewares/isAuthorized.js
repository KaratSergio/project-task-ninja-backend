import jwt from "jsonwebtoken";

import User from "../models/user";

import HttpError from "../helpers/HttpError";

const { SECRET_KEY } = process.env;

const isAuthorized = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    next(HttpError(401));
  }
  try {
    const isValidToken = jwt.verify(token, SECRET_KEY);

    const user = await User.findOne({ _id: isValidToken.id });
    if (!user || token !== user.accessToken || !user.accessToken)
      throw HttpError(401);

    req.user = user;
    next();
  } catch (error) {
    if (
      error.message === "invalid signature" ||
      error.message === "jwt expired" ||
      error.message === "jwt must be provided"
    ) {
      error.status = 401;
      error.message = "Unauthorized";
    }
    next(HttpError(401));
  }
};

export default isAuthorized;
