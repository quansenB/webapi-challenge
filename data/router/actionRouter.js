const express = require("express");
const Actions = require("../helpers/actionModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const actions = await Actions.get();
    if (actions.length > 0) {
      res.status(200).json(actions);
    } else {
      req.status(400).jsons({ message: "no actions available" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error while trying to retrieve the data" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const actions = await Actions.get(req.params.id);
    if (actions) {
      res.status(200).json(actions);
    } else {
      req.status(404).jsons({ message: "no action available for this id" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error while trying to retrieve the data" });
  }
});

router.post("/", async (req, res) => {
  try {
    const action = await Actions.insert(req.body);
    if (action) {
      res.status(201).json(action);
    } else {
      res.status(400).json({ message: "Wrong input" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error while trying to create the action" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await Actions.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "action has been deleted sucessfully" });
    } else {
      res.status(404).json({ message: "action with this ID not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error while trying to delete the action" });
  }
});

router.put("/", async (req, res) => {
  try {
    const action = await Actions.update(req.body);
    if (action) {
      res.status(204).json(action);
    } else {
      res.status(404).json({ message: "There is no action with this ID" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error while trying to create the action" });
  }
});

module.exports = router;
