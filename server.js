import mongoose from "mongoose";

import { app } from "./app.js";

const { DB_HOST, PORT } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Server started at port " + PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
