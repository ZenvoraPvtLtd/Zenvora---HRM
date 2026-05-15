import { NextFunction, Response } from "express";
import mongoose from "mongoose";
import { AuthRequest } from "./auth.middleware";

export const requireDatabase = (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message:
        "Database is not connected. Please check MONGO_URI/MONGODB_URI and MongoDB network access.",
    });
  }

  next();
};
