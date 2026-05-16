import { Response } from "express";
import Job from "../models/job.model";
import { AuthRequest } from "../middlewares/auth.middleware";

const allowedJobTypes = ["Full-time", "Part-time", "Internship", "Contract"];
const allowedStatus = ["Open", "Closed", "Paused"];

const toStringArray = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const buildJobPayload = (body: any, isUpdate = false) => {
  const payload: any = {};
  const fields = [
    "title",
    "description",
    "department",
    "location",
    "jobType",
    "experienceLevel",
    "status",
  ];

  fields.forEach((field) => {
    if (body[field] !== undefined) {
      payload[field] = String(body[field]).trim();
    }
  });

  if (body.salaryMin !== undefined && body.salaryMin !== "") {
    payload.salaryMin = Number(body.salaryMin);
  }

  if (body.salaryMax !== undefined && body.salaryMax !== "") {
    payload.salaryMax = Number(body.salaryMax);
  }

  if (body.openings !== undefined && body.openings !== "") {
    payload.openings = Number(body.openings);
  }

  if (body.applicationDeadline) {
    payload.applicationDeadline = new Date(body.applicationDeadline);
  }

  if (body.skills !== undefined) {
    payload.skills = toStringArray(body.skills);
  }

  if (body.responsibilities !== undefined) {
    payload.responsibilities = toStringArray(body.responsibilities);
  }

  if (body.qualifications !== undefined) {
    payload.qualifications = toStringArray(body.qualifications);
  }

  if (!isUpdate) {
    const requiredFields = [
      "title",
      "description",
      "department",
      "location",
      "jobType",
      "experienceLevel",
      "skills",
      "responsibilities",
      "qualifications",
    ];

    const missingField = requiredFields.find((field) => {
      const value = payload[field];
      return Array.isArray(value) ? value.length === 0 : !value;
    });

    if (missingField) {
      throw new Error("Please provide all required job fields");
    }
  }

  if (payload.jobType && !allowedJobTypes.includes(payload.jobType)) {
    throw new Error("Invalid job type");
  }

  if (payload.status && !allowedStatus.includes(payload.status)) {
    throw new Error("Invalid status value");
  }

  return payload;
};

export const getJobs = async (_req: AuthRequest, res: Response) => {
  try {
    const jobs = await Job.find()
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
      error: error.message,
    });
  }
};

export const getJobById = async (req: AuthRequest, res: Response) => {
  try {
    const job = await Job.findById(req.params.id).populate("createdBy", "name email role");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch job",
      error: error.message,
    });
  }
};

export const createJob = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const payload = buildJobPayload(req.body);

    const job = await Job.create({
      ...payload,
      openings: payload.openings || 1,
      status: payload.status || "Open",
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      job,
    });
  } catch (error: any) {
    const statusCode = error.message?.startsWith("Invalid") || error.message?.startsWith("Please")
      ? 400
      : 500;

    res.status(statusCode).json({
      success: false,
      message: statusCode === 400 ? error.message : "Failed to create job",
      error: error.message,
    });
  }
};

export const updateJob = async (req: AuthRequest, res: Response) => {
  try {
    const payload = buildJobPayload(req.body, true);

    const job = await Job.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error: any) {
    const statusCode = error.message?.startsWith("Invalid") ? 400 : 500;

    res.status(statusCode).json({
      success: false,
      message: statusCode === 400 ? error.message : "Failed to update job",
      error: error.message,
    });
  }
};

export const deleteJob = async (req: AuthRequest, res: Response) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete job",
      error: error.message,
    });
  }
};
