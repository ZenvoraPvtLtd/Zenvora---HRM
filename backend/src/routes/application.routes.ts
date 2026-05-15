import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import { protect } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { uploadResume } from "../middlewares/upload.middleware";
import { submitApplication, getMyApplications } from "../controllers/application.controller";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("candidate"),
  uploadResume.single("resume"),
  submitApplication
);

router.get(
  "/my",
  protect,
  authorizeRoles("candidate"),
  getMyApplications
);

router.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  if (err) {
    return res.status(400).json({ message: err.message });
  }
});

export default router;
