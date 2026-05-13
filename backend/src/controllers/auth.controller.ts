import { Request, Response } from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";

import User from "../models/user.model";

import {
  registerUser,
  loginUser,
} from "../services/auth.service";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";

/* ======================================================
   REGISTER
====================================================== */

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    const user = await registerUser(
      name,
      email,
      password,
      role
    );

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   LOGIN
====================================================== */

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } =
      req.body;

    const user = await loginUser(
      email,
      password
    );

    const accessToken =
      generateAccessToken(
        user._id.toString(),
        user.role
      );

    const refreshToken =
      generateRefreshToken(
        user._id.toString()
      );

    res.cookie(
      "refreshToken",
      refreshToken,
      {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      }
    );

    res.status(200).json({
      success: true,
      accessToken,
      user,
    });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   FORGOT PASSWORD
====================================================== */

export const forgotPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const email = String(
      req.body.email
    );

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    /* ===============================
       FIND USER
    =============================== */

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    /* ===============================
       GENERATE TOKEN
    =============================== */

    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken =
      hashedToken;

    user.resetPasswordExpire =
      new Date(
        Date.now() + 15 * 60 * 1000
      );

    await user.save({
      validateBeforeSave: false,
    });

    /* ===============================
       RESET URL
    =============================== */

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    console.log(
      "RESET URL:",
      resetUrl
    );

    console.log(
      "EMAIL USER:",
      process.env.EMAIL_USER
    );

    /* ===============================
       EMAIL TRANSPORTER
    =============================== */

    const transporter =
      nodemailer.createTransport({
        host: "smtp.gmail.com",

        port: 587,

        secure: false,

        auth: {
          user:
            process.env.EMAIL_USER,

          pass:
            process.env.EMAIL_PASS,
        },

        tls: {
          rejectUnauthorized: false,
        },
      });

    /* ===============================
       SEND EMAIL
    =============================== */

    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: user.email,

      subject: "Password Reset",

      html: `
        <h2>Password Reset Request</h2>

        <p>
          Click below to reset password:
        </p>

        <a href="${resetUrl}">
          Reset Password
        </a>

        <p>
          Link expires in 15 minutes.
        </p>
      `,
    });

    res.status(200).json({
      success: true,
      message:
        "Password reset email sent",
    });
  } catch (error: any) {
    console.log(
      "FORGOT PASSWORD ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   RESET PASSWORD
====================================================== */

export const resetPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const password = String(
      req.body.password
    );

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const resetToken = String(
      req.params.token
    );

    /* ===============================
       HASH TOKEN
    =============================== */

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    /* ===============================
       FIND USER
    =============================== */

    const user = await User.findOne({
      resetPasswordToken:
        hashedToken,

      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid or expired token",
      });
    }

    /* ===============================
       UPDATE PASSWORD
    =============================== */

    user.password = password;

    user.resetPasswordToken =
      undefined;

    user.resetPasswordExpire =
      undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password reset successful",
    });
  } catch (error: any) {
    console.log(
      "RESET PASSWORD ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};