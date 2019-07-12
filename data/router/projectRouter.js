const express = require("express");
const Projects = require("../helpers/projectModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Projects.get();
    if (projects) {
      res.status(200).json(projects);
    } else {
      req.status(400).jsons({ message: "no projects available" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error while trying to retrieve the data" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const projects = await Projects.get(req.params.id);
    if (projects) {
      res.status(200).json(projects);
    } else {
      req.status(404).jsons({ message: "no project available for this id" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error while trying to retrieve the data" });
  }
});

router.post("/", async (req, res) => {
  try {
    const project = await Projects.insert(req.body);
    if (project) {
      res.status(201).json(project);
    } else {
      res.status(400).json({ message: "Wrong input" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error while trying to create the project" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await Projects.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "Project has been deleted sucessfully" });
    } else {
      res.status(404).json({ message: "Project with this ID not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error while trying to delete the project" });
  }
});

router.put("/", async (req, res) => {
  try {
    const project = await Projects.update(req.body);
    if (project) {
      res.status(204).json(project);
    } else {
      res.status(404).json({ message: "There is no project with this ID" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error while trying to create the project" });
  }
});

router.get("/:id/actions", async (req, res) => {
  try {
    const actions = await Projects.getProjectActions(req.params.id);
    console.log(actions);
    if (actions.length > 0) {
      res.status(200).json(actions);
    } else {
      res.status(404).json({ message: "No actions found for this Project ID" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error while trying to create the project" });
  }
});

module.exports = router;
