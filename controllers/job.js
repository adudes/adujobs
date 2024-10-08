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
      currentPage: parseInt(page),
    });
  },

  getJob: async (req, res) => {
    const job = await Jobs.findById(req.params.jobid).populate("owner").exec();
    if (!job) {
      return res.status(404).send({ error: "Job not found" });
    }
    res.status(200).send(job);
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
      currentPage: parseInt(page),
    });
  },
  getJobByType: async (req, res) => {
    const { type } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const jobs = await Jobs.find({ type: type })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Jobs.countDocuments({ type: type });
    res.json({
      jobs,
      totalPages: Math.ceil(count / limit),
      count: count,
      currentPage: parseInt(page),
    });
  },

  getJobBySubCategory: async (req, res) => {
    const { subCategory } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const filter = req.query?.filterBy;

    const jobs = await Jobs.find({
      jobTitle: subCategory,
      ...filter,
    })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .exec();
    const count = await Jobs.countDocuments({
      jobTitle: subCategory,
      ...filter,
    });

    res.json({
      jobs,
      totalPages: Math.ceil(count / limit),
      count: count,
      currentPage: parseInt(page),
    });
  },

  getJobsByFilter: async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const filter = req.query?.filterBy;

    const jobs = await Jobs.find(filter)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .exec();
    const count = await Jobs.countDocuments(filter);

    res.json({
      jobs,
      totalPages: Math.ceil(count / limit),
      count: count,
      currentPage: parseInt(page),
    });
  },

  getUserJobs: async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const filter = req.query?.filterBy;

    const jobs = await Jobs.find({ owner: req.params.userid, ...filter })
      .limit(parseInt(limit) * 1)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .exec();
    const count = await Jobs.countDocuments({
      owner: req.params.userid,
      ...filter,
    });
    res.status(200).send({
      jobs,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  },
  getUserJobBySubCategory: async (req, res) => {
    const { subCategory } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const filter = req.query?.filterBy;

    const jobs = await Jobs.find({
      owner: req.params.userid,
      jobTitle: subCategory,
      ...filter,
    })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .exec();
    const count = await Jobs.countDocuments({
      owner: req.params.userid,
      jobTitle: subCategory,
      ...filter,
    });

    res.json({
      jobs,
      totalPages: Math.ceil(count / limit),
      count: count,
      currentPage: parseInt(page),
    });
  },
};
