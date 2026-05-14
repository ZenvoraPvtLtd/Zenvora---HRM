import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.routes";
import oauthRoutes from "./routes/oauth.routes";
import candidateRoutes from "./routes/candidate.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/auth", oauthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/candidate", candidateRoutes);

export default app;