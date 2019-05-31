const models = require("../models");
const express = require("express");
const router = express.Router();

router.get("/test", async function(req, res, next) {
  try {
    let user = await models.User.create({
      email: "johnny1@wizschool.io",
      password: "1234",
      name: "johnny"
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post("/add", async function(req, res, next) {
  try {
    let user = await models.User.create({
      email: "johnny@wizschool.io",
      password: "1234",
      name: "johnny"
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
