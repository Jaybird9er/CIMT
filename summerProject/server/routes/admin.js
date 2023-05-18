const express = require("express");
const router = express.Router();
const { Admin, User } = require("../models");

router.post("/", async (req, res) => {
  try {
    const { id, email } = req.body;
    await Admin.create({
      id: id,
      email: email,
    });
    res.json("Admin created");
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Admin.findByPk(
      id,
      { include: [User] },
      { where: { id: id } }
    );
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;



