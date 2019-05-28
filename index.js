const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;
require("dotenv").config();

// temp
const models = require("./models");

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT);
