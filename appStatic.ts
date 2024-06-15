import express from "express";

const app = express();
const port = 50000;

app.use(express.static("publicStatic", { index: "1.html" }));

export const startAppStatic = () =>
  app.listen(port, () => {
    console.log(`Listening port ${port}`);
  });
