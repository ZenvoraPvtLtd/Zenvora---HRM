import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.routes";
import oauthRoutes from "./routes/oauth.routes";
import jobRoutes from "./routes/job.routes";
import candidateRoutes from "./routes/candidate.routes";
import { requireDatabase } from "./middlewares/db.middleware";
import applicationRoutes from "./routes/application.routes";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use(cookieParser());
app.use("/api/oauth", oauthRoutes);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/auth", oauthRoutes);
app.use("/api/auth", requireDatabase, authRoutes);
app.use("/api/jobs", requireDatabase, jobRoutes);
app.use("/api/candidate", requireDatabase, candidateRoutes);
app.use("/api/applications", requireDatabase, applicationRoutes);

export default app;
