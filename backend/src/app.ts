import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.routes";
import oauthRoutes from "./routes/oauth.routes";
<<<<<<< HEAD
import jobRoutes from "./routes/job.routes";
=======
import candidateRoutes from "./routes/candidate.routes";
>>>>>>> 53a0b0fb5dae36a2d28e8bcbf4f552b16a1db318

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use(cookieParser());
<<<<<<< HEAD
app.use("/api/oauth", oauthRoutes);
=======
>>>>>>> 53a0b0fb5dae36a2d28e8bcbf4f552b16a1db318

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/auth", oauthRoutes);
app.use("/api/auth", authRoutes);
<<<<<<< HEAD
app.use("/api/jobs", jobRoutes);
=======
app.use("/api/candidate", candidateRoutes);
>>>>>>> 53a0b0fb5dae36a2d28e8bcbf4f552b16a1db318

export default app;