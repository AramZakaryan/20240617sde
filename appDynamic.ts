import express, { Request, Response } from "express";
import cors from "cors";
import { tracksRepository } from "./repository/tracksRepository";
import { runDb } from "./repository/db";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:50000",
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
    credentials: false,
  }),
);

app.use(express.static("publicLogic", { extensions: ["js"] }));

const port = 8888;

app.post("/track", (req: Request, res: Response) => {
  tracksRepository.createTracks(req.body);
  res.sendStatus(200);
});

export const startAppLogic = async () => {
  await runDb();
  app.listen(port, async () => {
    console.log(`Listening port ${port}`);
  });
};
