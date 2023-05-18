const express = require("express");
const Sequelize = require("sequelize");
const { Op, sequelize, query } = require("sequelize");
const router = express.Router();
const {
  Resource,
  User,
  ResourceFunction,
  Unit,
  Capability,
} = require("../models");

router.post("/", async (req, res) => {
  try {
    let data = {
      resourceName: req.body.name,
      PFunctionId: req.body.primaryFunction,
      SFunctionId: req.body.secondaryFunction,
      description: req.body.description,
      capabilities: req.body.capabilities,
      distance: req.body.distance,
      cost: req.body.cost,
      username: req.body.username,
      unitId: req.body.unit,
    };

    let resource = await Resource.create({
      resourceName: data.resourceName,
      PFunctionId: data.PFunctionId,
      SFunctionId: data.SFunctionId,
      description: data.description,
      capabilities: data.capabilities,
      distance: data.distance,
      cost: data.cost,
      username: data.username,
      unitId: data.unitId,
    });

    for (item of data.capabilities) {
      let capability = await Capability.create({
        capability: item,
        resourceId: resource.id,
      });
    }
    res.json(resource);
  } catch (error) {
    console.log(error);
  }
});

// find all or by keyword:

router.get("/search", async (req, res) => {
  try {
    var { resourceName, description, capability, primaryFunction, distance } =
      req.query;

    if (distance) {
      var whereDistance = {
        distance: {
          [Op.lte]: `${distance}`,
        },
      };
    }

    if (primaryFunction && primaryFunction != "null") {
      var wherePF = {
        PFunctionId: `${primaryFunction}`,
      };
    }

    var where1 = {
      [Op.or]: {
        description: { [Op.like]: `%${description}%` },
        resourceName: { [Op.like]: `%${resourceName}%` },
        "$Capabilities.capability$": { [Op.like]: `%${capability}%` },
      },
    };

    const response = await Resource.findAll({
      include: [
        ResourceFunction,
        User,
        Unit,
        {
          model: Capability,
          attributes: ["capability"],
        },
      ],
      where: [where1, wherePF, whereDistance],
      // **************************************sorting by distance version 1:
      // order: [
      //   [
      //     Sequelize.literal('CASE WHEN distance ="0.0" THEN 1 ELSE 0 END'),
      //     "ASC",
      //   ],
      // ],

      // **************************************sorting by distance version 2:
      order: [
        [
          Sequelize.literal('CASE WHEN distance ="0.0" THEN 1 ELSE 0 END'),
          "ASC",
        ],
        ["distance", "ASC"],
      ],
    });

    return res.json(response);
  } catch (err) {
    console.log(err);
  }
});

//
//

// Resource Report page:
router.get("/:username", async (req, res) => {
  try {
    const response = await ResourceFunction.findAndCountAll({
      include: {
        model: Resource,
        where: { username: req.params.username },
        left: true,
        required: false,
      },
      attributes: [
        "id",
        "description",
        "resources.PFunctionId",
        [Sequelize.fn("COUNT", Sequelize.col("PFunctionId")), "count"],
      ],
      group: ["id", "description"],
      order: ["id"],
    });
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

//  delete resource:
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Resource.destroy({ where: { id: id } });
    res.json("deleted");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
