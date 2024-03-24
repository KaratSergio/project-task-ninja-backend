import jwt from "jsonwebtoken";

const signToken = function () {
  const payload = { id: this._id };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "30d" });
};

export default signToken;
