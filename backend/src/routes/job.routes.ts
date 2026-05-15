import express from "express";
import {
  createJob,
  deleteJob,
  getJobById,
  getJobs,
  updateJob,
} from "../controllers/job.controller";
import { protect } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = express.Router();

router.get("/", protect, getJobs);
router.get("/:id", protect, getJobById);

router.post(
  "/",
  protect,
  authorizeRoles("admin", "hr", "employee"),
  createJob
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "hr", "employee"),
  updateJob
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "hr", "employee"),
  deleteJob
);

export default router;
