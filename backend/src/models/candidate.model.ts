import mongoose, { Document, Schema } from "mongoose";

export interface ICandidate extends Document {
  userId: mongoose.Types.ObjectId;
  resumeUrl: string;
  resumeOriginalName: string;
  resumeMimeType: string;
  appliedJob?: Record<string, unknown>;
  aiAnalysis?: Record<string, unknown>;
  parsedResume?: Record<string, unknown>;
  detectedSkills?: string[];
  detectedExperience?: Record<string, unknown>;
  riskAnalysis?: Record<string, unknown>;
  rankingResult?: Record<string, unknown>;
  recommendedJobs?: unknown[];
  fastApiParsedResumeId?: string;
  uploadedAt: Date;
}

const candidateSchema = new Schema<ICandidate>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    resumeOriginalName: {
      type: String,
      required: true,
    },
    resumeMimeType: {
      type: String,
      required: true,
    },
    appliedJob: {
      type: Schema.Types.Mixed,
    },
    aiAnalysis: {
      type: Schema.Types.Mixed,
    },
    parsedResume: {
      type: Schema.Types.Mixed,
    },
    detectedSkills: {
      type: [String],
      default: [],
    },
    detectedExperience: {
      type: Schema.Types.Mixed,
    },
    riskAnalysis: {
      type: Schema.Types.Mixed,
    },
    rankingResult: {
      type: Schema.Types.Mixed,
    },
    recommendedJobs: {
      type: [Schema.Types.Mixed],
      default: [],
    },
    fastApiParsedResumeId: {
      type: String,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Candidate = mongoose.model<ICandidate>("Candidate", candidateSchema);

export default Candidate;
