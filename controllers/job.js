import mongoose from "mongoose";
import Jobs from "../models/Jobs.js";

export default {
  createJob: async (req, res) => {
    console.log("========coming here to post data=====");
    console.log(req.body);
    const job = new Jobs(req.body);

    await job.save();
    res.status(201).send(job);
  },

  getJobs: async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const jobs = await Jobs.find()
      .populate("owner")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Jobs.countDocuments();
    res.status(200).send({
      jobs,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  },

  getJob: async (req, res) => {
    const job = await Jobs.findById(req.params.jobid).populate("owner").exec();
    if (!job) {
      return res.status(404).send({ error: "Job not found" });
    }
    res.status(200).send(job);
  },

  getUserJobs: async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const jobs = await Jobs.find({ owner: req.params.userid })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Jobs.countDocuments({ owner: req.params.userid });
    res.status(200).send({
      jobs,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  },

  deleteUserJob: async (req, res) => {
    const job = await Jobs.findOneAndDelete({
      _id: req.params.jobid,
      owner: req.params.userid,
    });
    if (!job) {
      return res.status(404).send({ error: "Job not found or not authorized" });
    }
    res.status(200).send({ message: "Job deleted successfully" });
  },

  updateJobDetails: async (req, res) => {
    const job = await Jobs.findOneAndUpdate(
      { _id: req.params.jobid, owner: req.params.userid },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
      return res.status(404).send({ error: "Job not found or not authorized" });
    }
    res.status(200).send(job);
  },
  getJobByCategory: async (req, res) => {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const jobs = await Jobs.find({ categories: category })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Jobs.countDocuments({ categories: category });
    res.json({
      jobs,
      totalPages: Math.ceil(count / limit),
      count: count,
      currentPage: page,
    });
  },

  getJobBySubCategory: async (req, res) => {
    const { subCategory } = req.params;
    const { page = 1, limit = 10 } = req.query;
    console.log(subCategory);
    const jobs = await Jobs.find({
      jobTitle: subCategory,
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Jobs.countDocuments({
      jobTitle: subCategory,
    });
    res.json({
      jobs,
      totalPages: Math.ceil(count / limit),
      count: count,
      currentPage: page,
    });
  },
};
