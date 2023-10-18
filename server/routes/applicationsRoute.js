import express from "express";
import { Application } from "../models/Application.js";

const router = express.Router();

//Route for save a new application
router.post("/", async (req, res) => {
  try {
    const newApplication = req.body;
    const application = await Application.create(newApplication);
    return res.status(201).send(application);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route for get all applications from database:
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find({});

    return res.status(200).json({
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route for user applications:
router.get("/:username", async (req, res) => {
  try {
    const userApplications = await Application.find({
      username: req.params.username,
    });
    res.status(200).json({
      data: userApplications,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route for update applications:
router.put("/:id", async (req, res) => {
  try {
    const { company_name, job_title, apply_date, status, username } = req.body;

    if (!company_name || !job_title || !apply_date || !status || !username) {
      return res.status(400).send({
        message: "Missing required field...",
      });
    }

    const result = await Application.findByIdAndUpdate(req.params.id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Application not found!" });
    }

    return res.status(200).send({ message: "Application updated!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route for delete an application:
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found!" });
    }

    return res.status(200).send({ message: "Application deleted!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
