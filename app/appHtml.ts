import express from "express";

const app = express();
const port = 50000;

app.use(express.static("publicHtml", { index: "1.html" }));

export const startAppHtml = () =>
  app.listen(port, () => {
    console.log(`Listening port ${port}`);
  });
