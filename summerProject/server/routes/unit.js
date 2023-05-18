const express = require("express");
const router = express.Router();
const { Unit } = require("../models");

router.post("/", async (req, res) => {
  try {
    const { id, typeName } = req.body;
    await Unit.create({
      id: id,
      typeName: typeName,
    });
    res.json("Unit created");
  } catch (err) {
    console.log(err);
  }
});

router.get("/", (req, res) => {
  Unit.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred.",
      });
    });
});

module.exports = router;
