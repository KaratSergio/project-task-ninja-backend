import { Schema, model } from "mongoose";

import { handleMongooseError } from "../helpers";

import { icons, backgrounds } from "../constants/array.js";

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title for the board is required"],
    },
    icon: {
      type: String,
      enum: icons,
      default: icons[0],
    },
    background: {
      type: String,
      enum: backgrounds,
      default: backgrounds[0],
    },
    columnOrder: {
      type: Array,
      default: [],
    },
    owners: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

boardSchema.post("save", handleMongooseError);

const Board = model("board", boardSchema);

export default Board;
