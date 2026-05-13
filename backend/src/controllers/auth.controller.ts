import { Request, Response } from "express";

import {
  registerUser,
  loginUser,
} from "../services/auth.service";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const { fullName, email, password, role, phoneNumber } = req.body;

    const user = await registerUser(
      fullName,
      email,
      password,
      role,
      phoneNumber
    );

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    const accessToken = generateAccessToken(
      user._id.toString(),
      user.role
    );

    const refreshToken = generateRefreshToken(
      user._id.toString()
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      accessToken,
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};