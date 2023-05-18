const express = require("express");
const router = express.Router();
const { Incident, User, Category } = require("../models");

router.post("/", async (req, res) => {
  let data = {
    categoryId: req.body.category,
    date: req.body.date,
    description: req.body.description,
    username: req.body.username,
  };
  // get incident Id :
  let amount = await Incident.count({
    where: {
      categoryId: data.categoryId,
    },
  });
  amount = amount + 1;

  const incident = await Incident.create({
    id: data.categoryId + "-" + amount,
    categoryId: data.categoryId,
    date: data.date,
    description: data.description,
    username: data.username,
  });
  res.json(`${data.categoryId}-${amount}`);
});

router.get("/", async (req, res) => {
  try {
    const response = await Incident.findAll({ include: [User, Category] });
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
