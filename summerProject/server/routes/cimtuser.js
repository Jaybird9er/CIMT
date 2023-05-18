const express = require("express");
const router = express.Router();
const { CimtUser, User } = require("../models");

router.post("/", async (req, res) => {
  try {
    const { id, phone } = req.body;
    await CimtUser.create({
      id: id,
      phone: phone,
    });
    res.json("CimtUser created");
  } catch (err) {
    console.log(err);
  }
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await CimtUser.findByPk(id, { where: { id: id } });
    res.json(response);
  } catch (err) {
    console.log(err);
  }

});

module.exports = router;

