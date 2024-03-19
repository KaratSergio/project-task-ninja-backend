import { Types } from "mongoose";

import { Board } from "../../models/board.js";

const getUserBoards = async (req, res) => {
  const { _id } = req.user;
  const objectId = Types.createFromTime(_id);

  const result = await Board.aggregate([
    {
      $match: { $expr: { $in: [objectId, "$owners"] } },
    },
    {
      $lookup: {
        from: "users",
        let: { owners: "$owners" },
        pipeline: [
          {
            $match: { $expr: { $in: ["$_id", "$$owners"] } },
          },
          {
            $project: {
              _id: 0,
              avatarURL: 1,
              name: 1,
              email: 1,
            },
          },
        ],
        as: "owners",
      },
    },
  ]);
  res.json(result);
};

export default getUserBoards;
