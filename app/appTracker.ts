import express, { Request, Response } from "express";
import { runDb } from "../repository/db";
import { body, validationResult } from "express-validator";
import { repository } from "../repository/repository";
import cors from "cors";

const port = 8888;

const app = express();
app.use(
  cors({
    origin: ["http://localhost:50000"],
    methods: "*",
    allowedHeaders: "*",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);
app.use(express.json());

app.use(express.static("publicTracker", { extensions: ["js"] }));

const tracksValidationRules = [
  body().isArray(), // tracks must be an array
  body("*").isObject(), // each track must be an object
  body("*.event").isString(), // each event must be a string
  body("*.tags").isArray(), // each tags must be an array of strings
  body("*.tags.*").isString(), // each tag must be a string
  body("*.url").isURL({ host_whitelist: ["localhost", "127.0.0.1"] }), // url must be a valid url
  body("*.title").isString(), // each title must be a string
  body("*.ts").isInt({ gt: 0 }), // each timestamp must be a valid Unix time (integer)
];

app.post("/track", tracksValidationRules, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.sendStatus(422);
  }
  repository
    .createTracks(req.body)
    .then((result) => !result && console.log("❌  tracks are NOT created"));
  // res.sendStatus(200);
  res
    .status(200)
    .json({ success: true, message: "Tracks created successfully" });
});

export const startAppTracker = async () => {
  await runDb();
  app.listen(port, async () => {
    console.log(`listening port ${port}`);
  });
};
