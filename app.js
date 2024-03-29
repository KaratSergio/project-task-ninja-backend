import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import routerAuth from "./routes/routerAuth.js";
import routerTasks from "./routes/routerTasks.js";
import routerBoards from "./routes/routerBoards.js";
import routerColumns from "./routes/routerColumns.js";

export const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/api/users", routerAuth);
app.use("/api/tasks", routerTasks);
app.use("/api/boards", routerBoards);
app.use("/api/columns", routerColumns);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

export default app;
