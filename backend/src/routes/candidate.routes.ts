import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import { protect } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { uploadResume } from "../middlewares/upload.middleware";
import {
  uploadCandidateResume,
  getCandidateResume,
  deleteCandidateResume,
} from "../controllers/candidate.controller";

const router = express.Router();

router.post(
  "/resume",
  protect,
  authorizeRoles("candidate"),
  uploadResume.single("resume"),
  uploadCandidateResume
);

router.get(
  "/resume",
  protect,
  authorizeRoles("candidate"),
  getCandidateResume
);

router.delete(
  "/resume",
  protect,
  authorizeRoles("candidate"),
  deleteCandidateResume
);

// Multer error handler — must be registered after routes
router.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File too large. Maximum size is 5 MB." });
    }
    return res.status(400).json({ message: err.message });
  }
  if (err) {
    return res.status(400).json({ message: err.message });
  }
});

export default router;
