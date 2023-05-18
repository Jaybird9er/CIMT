const express = require("express");
const router = express.Router();
const { Category, Incident } = require("../models");

router.post("/", async (req, res) => {
  try {
    const { id, description } = req.body;
    await Category.create({
      id: id,
      description: description,
    });
    res.json("Category created");
  } catch (err) {
    console.log(err);
  }
});

router.get("/", (req, res) => {
  Category.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories.",
      });
    });
});

module.exports = router;
