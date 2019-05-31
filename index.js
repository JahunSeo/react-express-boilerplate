const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 5000;
require("dotenv").config();

// https://medium.com/@adamzerner/how-bodyparser-works-247897a93b90
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
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
