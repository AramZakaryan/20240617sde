import express from "express";

const app = express();
const port = 50000;

app.use(express.static("publicPages", { index: "1.html" }));

export const startAppPages = () =>
  app.listen(port, () => {
    console.log(`listening port ${port}`);
  });
