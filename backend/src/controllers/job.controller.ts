import { Request, Response } from "express";
import Job from "../models/job.model";
import { AuthRequest } from "../middlewares/auth.middleware";

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find({ status: "Open" })
      .select("-__v")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error: any) {
    console.error("Get jobs error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
      error: error.message,
    });
  }
};

export const createJob = async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      description,
      department,
      location,
      jobType,
      experienceLevel,
      salaryMin,
      salaryMax,
      skills,
      responsibilities,
      qualifications,
      openings,
      status,
      applicationDeadline,
    } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const requiredFields = [
      title,
      description,
      department,
      location,
      jobType,
      experienceLevel,
      skills,
      responsibilities,
      qualifications,
    ];

    if (requiredFields.some((field) => field === undefined || field === null)) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required job fields",
      });
    }

    if (
      !Array.isArray(skills) ||
      !Array.isArray(responsibilities) ||
      !Array.isArray(qualifications)
    ) {
      return res.status(400).json({
        success: false,
        message: "Skills, responsibilities, and qualifications must be arrays",
      });
    }

    const allowedJobTypes = [
      "Full-time",
      "Part-time",
      "Internship",
      "Contract",
    ];
    if (!allowedJobTypes.includes(jobType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job type",
      });
    }

    const allowedStatus = ["Open", "Closed", "Paused"];
    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const job = await Job.create({
      title,
      description,
      department,
      location,
      jobType,
      experienceLevel,
      salaryMin,
      salaryMax,
      skills,
      responsibilities,
      qualifications,
      openings: openings || 1,
      status: status || "Open",
      applicationDeadline: applicationDeadline
        ? new Date(applicationDeadline)
        : undefined,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      job,
    });
  } catch (error: any) {
    console.error("Create job error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create job",
      error: error.message,
    });
  }
};
