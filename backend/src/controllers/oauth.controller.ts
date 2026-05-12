import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const oauthSuccess = async (
  req: Request,
  res: Response
) => {
  try {
    const user = req.user as any;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed",
      });
    }

    // Generate JWT
    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_ACCESS_SECRET!,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_REFRESH_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "OAuth login successful",
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "OAuth login failed",
    });
  }
};