import { Response } from "express";
import path from "path";
import fs from "fs";
import Candidate from "../models/candidate.model";
import { AuthRequest } from "../middlewares/auth.middleware";

const FASTAPI_BASE_URL = process.env.FASTAPI_BASE_URL || "http://localhost:8000";

const toArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map(String).filter(Boolean);
      }
    } catch {
      // Fall back to comma-separated values below.
    }

    return value
      .split(",")
      .map((item) => item.replace(/^\[?["']?|["']?\]?$/g, ""))
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const flattenCandidateSkills = (candidateData: any): string[] => {
  const skills = candidateData?.skills || {};
  return [
    ...toArray(skills?.technical_skills),
    ...toArray(skills?.soft_skills),
    ...toArray(skills?.tools_and_technologies),
  ];
};

const getCandidateName = (candidateData: any, fallback = "Candidate") =>
  candidateData?.personal_information?.full_name || candidateData?.name || fallback;

const getCandidateEmail = (candidateData: any, fallback = "") =>
  candidateData?.personal_information?.email || candidateData?.email || fallback;

const getMatchScore = (analysis: any) =>
  Math.round(
    Number(
      analysis?.ranking_result?.job_fit_score ??
        analysis?.risk_analysis?.semantic_similarity ??
        0
    )
  );

const buildFrontendAnalysis = (
  fastApiResult: any,
  resume: Express.Multer.File,
  user: any,
  appliedJob?: Record<string, unknown>
) => {
  const candidateData = fastApiResult?.candidate_data || fastApiResult?.data || {};
  const ranking = fastApiResult?.ranking_result || {};
  const risk = fastApiResult?.risk_analysis || {};
  const matchScore = getMatchScore(fastApiResult);
  const jobTitle = String(appliedJob?.job_title || appliedJob?.title || ranking?.ranking || "Applied Role");

  return {
    candidate: {
      name: getCandidateName(candidateData, user?.name || "Candidate"),
      email: getCandidateEmail(candidateData, user?.email || ""),
      skills: candidateData?.skills || {},
      experience: candidateData?.experience || {},
    },
    application: {
      role: jobTitle,
      appliedDate: new Date().toISOString().slice(0, 10),
      status:
        risk?.decision === "REJECT"
          ? "Rejected"
          : matchScore >= 70
            ? "Shortlisted"
            : "Pending",
      matchScore,
      recommendation: ranking?.ranking || "Analysis Complete",
    },
    resume: {
      url: `/uploads/resumes/${resume.filename}`,
      originalName: resume.originalname,
      mimeType: resume.mimetype,
    },
    ai: {
      parsedResume: candidateData,
      recommendedJobs: fastApiResult?.recommended_jobs || [],
      riskAnalysis: risk,
      rankingResult: ranking,
      jdData: fastApiResult?.jd_data || {},
    },
  };
};

const buildCandidateAiFields = (fastApiResult: any) => {
  const candidateData = fastApiResult?.candidate_data || fastApiResult?.data || {};

  return {
    parsedResume: candidateData,
    detectedSkills: flattenCandidateSkills(candidateData),
    detectedExperience: candidateData?.experience?.experience || candidateData?.experience || {},
    riskAnalysis: fastApiResult?.risk_analysis || {},
    rankingResult: fastApiResult?.ranking_result || {},
    recommendedJobs: fastApiResult?.recommended_jobs || [],
    fastApiParsedResumeId:
      fastApiResult?.parsed_resume_id ||
      fastApiResult?.data?._id ||
      fastApiResult?._id,
  };
};

const analyzeWithFastApi = async (
  resume: Express.Multer.File,
  appliedJob?: Record<string, unknown>
) => {
  const formData = new FormData();
  const fileBuffer = await fs.promises.readFile(resume.path);
  const blob = new Blob([fileBuffer], { type: resume.mimetype });

  formData.append("resume", blob, resume.originalname);
  formData.append("job_title", String(appliedJob?.job_title || appliedJob?.title || ""));
  formData.append("department", String(appliedJob?.department || appliedJob?.field || ""));
  formData.append("location", String(appliedJob?.location || ""));
  formData.append("experience_required", String(appliedJob?.experience_required || appliedJob?.experience || ""));
  formData.append(
    "required_skills",
    JSON.stringify(toArray(appliedJob?.required_skills || appliedJob?.skills || appliedJob?.tags))
  );
  formData.append("job_description", String(appliedJob?.job_description || appliedJob?.description || ""));

  const response = await fetch(`${FASTAPI_BASE_URL}/analyze_application`, {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok || result?.success === false) {
    throw new Error(result?.message || result?.error || "FastAPI analysis failed");
  }

  return result;
};

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
    const fastApiResult = await analyzeWithFastApi(req.file);
    const frontendAnalysis = buildFrontendAnalysis(fastApiResult, req.file, req.user);
    const aiFields = buildCandidateAiFields(fastApiResult);

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
      existing.aiAnalysis = frontendAnalysis;
      existing.parsedResume = aiFields.parsedResume;
      existing.detectedSkills = aiFields.detectedSkills;
      existing.detectedExperience = aiFields.detectedExperience;
      existing.riskAnalysis = aiFields.riskAnalysis;
      existing.rankingResult = aiFields.rankingResult;
      existing.recommendedJobs = aiFields.recommendedJobs;
      existing.fastApiParsedResumeId = aiFields.fastApiParsedResumeId;
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
        analysis: frontendAnalysis,
        extracted: aiFields,
      });
    }

    const candidate = await Candidate.create({
      userId,
      resumeUrl,
      resumeOriginalName: req.file.originalname,
      resumeMimeType: req.file.mimetype,
      aiAnalysis: frontendAnalysis,
      ...aiFields,
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
      analysis: frontendAnalysis,
      extracted: aiFields,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const submitCandidateApplication = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No resume uploaded" });
    }

    const userId = req.user?.id;
    const appliedJob = {
      job_title: req.body.job_title,
      title: req.body.title,
      department: req.body.department,
      field: req.body.field,
      location: req.body.location,
      experience_required: req.body.experience_required,
      experience: req.body.experience,
      required_skills: req.body.required_skills,
      skills: req.body.skills,
      tags: req.body.tags,
      job_description: req.body.job_description,
      description: req.body.description,
    };

    const resumeUrl = `/uploads/resumes/${req.file.filename}`;
    const fastApiResult = await analyzeWithFastApi(req.file, appliedJob);
    const frontendAnalysis = buildFrontendAnalysis(fastApiResult, req.file, req.user, appliedJob);
    const aiFields = buildCandidateAiFields(fastApiResult);

    const candidate = await Candidate.findOneAndUpdate(
      { userId },
      {
        userId,
        resumeUrl,
        resumeOriginalName: req.file.originalname,
        resumeMimeType: req.file.mimetype,
        appliedJob,
        aiAnalysis: frontendAnalysis,
        ...aiFields,
        uploadedAt: new Date(),
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(201).json({
      success: true,
      message: "Application submitted and analyzed successfully",
      application: frontendAnalysis.application,
      candidate: frontendAnalysis.candidate,
      resume: {
        url: candidate.resumeUrl,
        originalName: candidate.resumeOriginalName,
        mimeType: candidate.resumeMimeType,
        uploadedAt: candidate.uploadedAt,
      },
      analysis: frontendAnalysis,
      extracted: aiFields,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCandidateApplications = async (
  _req: AuthRequest,
  res: Response
) => {
  try {
    const candidates = await Candidate.find({ aiAnalysis: { $exists: true } }).sort({ uploadedAt: -1 });

    return res.status(200).json({
      success: true,
      candidates: candidates.map((candidate, index) => {
        const analysis: any = candidate.aiAnalysis || {};
        return {
          id: candidate._id?.toString() || index + 1,
          name: analysis?.candidate?.name || getCandidateName(candidate.parsedResume, "Candidate"),
          email: analysis?.candidate?.email || getCandidateEmail(candidate.parsedResume, ""),
          avatar: `https://i.pravatar.cc/150?u=${candidate._id}`,
          role: analysis?.application?.role || "Applied Role",
          appliedDate: analysis?.application?.appliedDate || candidate.uploadedAt.toISOString().slice(0, 10),
          matchScore: analysis?.application?.matchScore || 0,
          status: analysis?.application?.status || "Pending",
          detectedSkills: candidate.detectedSkills || [],
          detectedExperience: candidate.detectedExperience || {},
          riskAnalysis: candidate.riskAnalysis || {},
          rankingResult: candidate.rankingResult || {},
          analysis,
        };
      }),
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
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
      extracted: {
        parsedResume: candidate.parsedResume || {},
        detectedSkills: candidate.detectedSkills || [],
        detectedExperience: candidate.detectedExperience || {},
        riskAnalysis: candidate.riskAnalysis || {},
        rankingResult: candidate.rankingResult || {},
        recommendedJobs: candidate.recommendedJobs || [],
        fastApiParsedResumeId: candidate.fastApiParsedResumeId,
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
