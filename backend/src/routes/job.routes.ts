import express from "express";
import { getJobs, createJob } from "../controllers/job.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", getJobs);
router.post("/", protect, createJob);

export default router;
