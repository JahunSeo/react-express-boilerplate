const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 5000;
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const users = require("./routes/users");
app.use("/users", users);

const db = require("./db");
db();

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT);
