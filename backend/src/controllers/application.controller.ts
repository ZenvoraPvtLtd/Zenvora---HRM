import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import Application from "../models/application.model";
import Candidate from "../models/candidate.model";

export const submitApplication = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { jobId, jobTitle, company, firstName, lastName, email, phone, linkedin, portfolio, coverLetter } = req.body;

    if (!jobId || !jobTitle || !company || !firstName || !lastName || !email || !phone) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Check for duplicate application
    const existing = await Application.findOne({ userId, jobId });
    if (existing) {
      return res.status(409).json({ message: "You have already applied for this job" });
    }

    // Use uploaded resume file or fall back to candidate's saved resume
    let resumeUrl: string | undefined;
    let resumeOriginalName: string | undefined;

    if (req.file) {
      resumeUrl = `/uploads/resumes/${req.file.filename}`;
      resumeOriginalName = req.file.originalname;
    } else {
      const candidate = await Candidate.findOne({ userId });
      if (candidate?.resumeUrl) {
        resumeUrl = candidate.resumeUrl;
        resumeOriginalName = candidate.resumeOriginalName;
      }
    }

    const application = await Application.create({
      jobId,
      jobTitle,
      company,
      userId,
      firstName,
      lastName,
      email,
      phone,
      linkedin,
      portfolio,
      coverLetter,
      resumeUrl,
      resumeOriginalName,
    });

    return res.status(201).json({ success: true, message: "Application submitted successfully", application });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMyApplications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const applications = await Application.find({ userId }).sort({ appliedAt: -1 });
    return res.status(200).json({ success: true, applications });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
