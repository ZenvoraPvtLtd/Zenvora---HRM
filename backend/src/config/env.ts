import dotenv from "dotenv";
import path from "path";

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

process.env.MONGO_URI ||= process.env.MONGODB_URI;
process.env.JWT_ACCESS_SECRET ||= process.env.JWT_SECRET;
process.env.JWT_REFRESH_SECRET ||= process.env.JWT_SECRET;
process.env.CLIENT_URL ||= process.env.FRONTEND_URL || "http://localhost:5173";
process.env.FRONTEND_URL ||= process.env.CLIENT_URL || "http://localhost:5173";



import express from "express";
import mongoose from "mongoose";
dotenv.config();
