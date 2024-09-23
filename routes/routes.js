import express from "express";

import asyncmiddleware from "../middlewares/asyncMiddleware.js";
import users from "../controllers/users.js";
import job from "../controllers/job.js";

const router = express.Router();

// ====user====
router.post("/users/", asyncmiddleware(users.createUser));
router.post("/users/coin/:userid", asyncmiddleware(users.addCoinToUser));
router.post("/users/rate/:userid", asyncmiddleware(users.addRateUser));
router.get("/users/:userid", asyncmiddleware(users.getUser));
router.put("/users/:userid", asyncmiddleware(users.updateUser));
router.delete("/users/:userid", asyncmiddleware(users.deleteUser));
//====jobs======
router.get("/jobs", asyncmiddleware(job.getJobs));
router.get("/jobs/:jobid", asyncmiddleware(job.getJob));
router.get("/jobs/user/:userid", asyncmiddleware(job.getUserJobs));
router.delete("/jobs/user/:userid/:jobid", asyncmiddleware(job.deleteUserJob));
router.put("/jobs/user/:userid/:jobid", asyncmiddleware(job.updateJobDetails));
router.post("/jobs/:userid", asyncmiddleware(job.createJob));
router.get("/jobs/category/:category", asyncmiddleware(job.getJobByCategory));
router.get(
  "/jobs/subcategory/:subCategory",
  asyncmiddleware(job.getJobBySubCategory)
);
export default router;
