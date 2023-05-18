const express = require("express");
const router = express.Router();
const { Provider, User } = require("../models");

router.post("/", async (req, res) => {
  try {
    const { id, address } = req.body;
    await Provider.create({
      id: id,
      address: address,
    });
    res.json("Provider created");
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Provider.findByPk(id, { where: { UserId: id } });
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

