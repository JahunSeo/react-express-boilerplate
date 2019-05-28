const express = require("express");
// temp
const models = require("./models");

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT);
