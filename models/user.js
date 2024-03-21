import { Schema, model } from "mongoose";

import handleMongooseError from "../helpers";

import { themes } from "../constants/array.js";
import { email, password } from "../constants/regExp.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "User",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: email,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      match: password,
    },
    theme: {
      type: String,
      enum: themes,
      default: themes[1],
    },
    avatarURL: {
      type: String,
      default: "",
    },
    accessToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

export default User;
