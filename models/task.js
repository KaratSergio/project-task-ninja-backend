import { Schema, model } from "mongoose";

import handleMongooseError from "../helpers";

import { priorities } from "../constants/array.js";
import { deadline } from "../constants/regExp.js";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title for the task is required"],
    },
    description: {
      type: String,
      required: [true, "Description for the task is required"],
    },
    priority: {
      type: String,
      enum: priorities,
      default: priorities[0],
    },
    deadline: {
      type: String,
      match: deadline,
      default: null,
    },
    column: {
      type: Schema.Types.ObjectId,
      required: [true, "Column assignment for the task is required"],
      ref: "column",
    },
  },
  { versionKey: false, timestamps: true }
);

taskSchema.post("save", handleMongooseError);

const Task = model("task", taskSchema);

export default Task;
