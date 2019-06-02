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
    // todo: check user email and publicStatus of vertices,
    // then this api's method should be changed into post.

    let { vertexId } = req.params;
    let vertex = await models.Vertex.findByPk(vertexId, {
      order: [
        ["childEdges", "order", "ASC"],
        ["parentEdges", "updatedAt", "DESC"]
      ],
      include: [
        {
          model: models.Edge,
          as: "childEdges",
          attributes: ["order", "createdAt"],
          include: [
            {
              model: models.Vertex,
              as: "childVertex"
            }
          ]
        },
        {
          model: models.Edge,
          as: "parentEdges",
          attributes: ["order", "createdAt"],
          include: [
            {
              model: models.Vertex,
              as: "parentVertex"
            }
          ]
        }
      ]
    });

    // after query, check and set availability of each vertices in terms of user who request data.
    // - check main vertex
    // - check each of childVertices
    // - check each of parentVertices

    // todo: get from req.body
    let email = "test@test.com";

    vertex = vertex.get();
    if (vertex.email !== email) {
      if (vertex.publicStatus !== "public") {
        // response with empty data: you are not allowed to access the data.
        res.json({
          status: "failed",
          msg: "you are not allowed to access the data."
        });
        return;
      } else {
        // and now, check each of childVertices
        vertex.childEdges = vertex.childEdges.map(edge => {
          // todo: if the vertex is not user's own and not public, erase property except email(writer).
          return edge;
        });
        // lastly, check each of parentVertices
        vertex.parentEdges = vertex.parentEdges.map(edge => {
          // todo
          return edge;
        });
      }
    }
    vertex.isAvailabilityChecked = true;

    res.json(vertex);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
