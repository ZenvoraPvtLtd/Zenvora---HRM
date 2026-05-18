import { Response } from "express";
import path from "path";
import fs from "fs";
import Candidate from "../models/candidate.model";
import { AuthRequest } from "../middlewares/auth.middleware";

export const uploadCandidateResume = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.user?.id;
    const resumeUrl = `/uploads/resumes/${req.file.filename}`;

    const existing = await Candidate.findOne({ userId });

    if (existing) {
      // Delete old file from disk
      const oldPath = path.join(process.cwd(), existing.resumeUrl);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

      existing.resumeUrl = resumeUrl;
      existing.resumeOriginalName = req.file.originalname;
      existing.resumeMimeType = req.file.mimetype;
      existing.uploadedAt = new Date();
      await existing.save();

      return res.status(200).json({
        success: true,
        message: "Resume updated successfully",
        resume: {
          url: resumeUrl,
          originalName: existing.resumeOriginalName,
          mimeType: existing.resumeMimeType,
          uploadedAt: existing.uploadedAt,
        },
      });
    }

    const candidate = await Candidate.create({
      userId,
      resumeUrl,
      resumeOriginalName: req.file.originalname,
      resumeMimeType: req.file.mimetype,
    });

    return res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: {
        url: candidate.resumeUrl,
        originalName: candidate.resumeOriginalName,
        mimeType: candidate.resumeMimeType,
        uploadedAt: candidate.uploadedAt,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCandidateResume = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const candidate = await Candidate.findOne({ userId });

    if (!candidate) {
      return res.status(404).json({ message: "No resume found" });
    }

    return res.status(200).json({
      success: true,
      resume: {
        url: candidate.resumeUrl,
        originalName: candidate.resumeOriginalName,
        mimeType: candidate.resumeMimeType,
        uploadedAt: candidate.uploadedAt,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCandidateResume = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const candidate = await Candidate.findOne({ userId });

    if (!candidate) {
      return res.status(404).json({ message: "No resume found" });
    }

    const filePath = path.join(process.cwd(), candidate.resumeUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await candidate.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
