const express = require("express");
const router = express.Router();
const { User, Admin, Provider, CimtUser } = require("../models");

router.post("/", async (req, res) => {
  try {
    const { displayName, username, password } = req.body;
    await User.create({
      username: username,
      displayName: displayName,
      password: password,
    });

    res.json(User.username);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username: username,
        password: password,
      },
    });
    if (!user) {
      return res.json({ error: "Invalid username or password" });
    } else {
      return res.json(user);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await User.findAll({
      include: [Admin, Provider, CimtUser],
    });
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const response = await User.findByPk(
      username,
      { include: [Admin, Provider, CimtUser] },
      { where: { username: username } }
    );
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
