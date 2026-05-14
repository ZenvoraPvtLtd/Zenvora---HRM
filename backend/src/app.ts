import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import oauthRoutes from "./routes/oauth.routes";
import jobRoutes from "./routes/job.routes";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use(cookieParser());
app.use("/api/oauth", oauthRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

export default app;