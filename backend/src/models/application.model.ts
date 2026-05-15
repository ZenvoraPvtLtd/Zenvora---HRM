import mongoose, { Document, Schema } from "mongoose";

export interface IApplication extends Document {
  jobId: string;
  jobTitle: string;
  company: string;
  userId: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin?: string;
  portfolio?: string;
  resumeUrl?: string;
  resumeOriginalName?: string;
  coverLetter?: string;
  status: "pending" | "reviewed" | "shortlisted" | "rejected";
  appliedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    jobId: { type: String, required: true },
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    linkedin: { type: String },
    portfolio: { type: String },
    resumeUrl: { type: String },
    resumeOriginalName: { type: String },
    coverLetter: { type: String },
    status: {
      type: String,
      enum: ["pending", "reviewed", "shortlisted", "rejected"],
      default: "pending",
    },
    appliedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Application = mongoose.model<IApplication>("Application", ApplicationSchema);
export default Application;
