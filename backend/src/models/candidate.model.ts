import mongoose, { Document, Schema } from "mongoose";

export interface ICandidate extends Document {
  userId: mongoose.Types.ObjectId;
  resumeUrl: string;
  resumeOriginalName: string;
  resumeMimeType: string;
  appliedJob?: Record<string, unknown>;
  aiAnalysis?: Record<string, unknown>;
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
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Candidate = mongoose.model<ICandidate>("Candidate", candidateSchema);

export default Candidate;
