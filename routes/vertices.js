const models = require("../models");
const express = require("express");
const router = express.Router();

router.get("/test", async function(req, res, next) {
  try {
    let vertices = [];
    vertices.push({
      email: "johnny@wizschool.io",
      type: "THREAD",
      title: "a thread"
    });
    vertices.push({
      email: "johnny@wizschool.io",
      type: "BEAD",
      title: "a bead"
    });
    vertices = await models.Vertex.bulkCreate(vertices);

    let edge = {
      from: vertices[0].id,
      to: vertices[1].id,
      order: 0
    };
    edge = await models.Edge.create(edge);

    res.json({
      vertices,
      edge
    });
  } catch (err) {
    next(err);
  }
});

router.get("/get/:vertexId", async function(req, res, next) {
  try {
    console.log(121212, req.params);
    let { vertexId } = req.params;
    let vertex = await models.Vertex.findByPk(vertexId, {
      // include: [
      //   {
      //     model: models.Edge
      //   }
      // ]
    });
    res.json(vertex);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
