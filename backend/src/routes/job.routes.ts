import express from "express";
import { createJob } from "../controllers/job.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", protect, createJob);

export default router;
