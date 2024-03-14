import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

export const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});
