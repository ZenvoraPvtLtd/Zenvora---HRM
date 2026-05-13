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

import { hashPassword } from "../utils/hashPassword";

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
    const email = String(req.body.email).trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    /* ===============================
       FIND USER
    =============================== */

    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal if user exists or not for security
      return res.status(200).json({
        success: true,
        message: "If an account with that email exists, a password reset link has been sent.",
      });
    }

    // Check if user is OAuth user (no password to reset)
    if (!user.password) {
      return res.status(200).json({
        success: true,
        message: "If an account with that email exists, a password reset link has been sent.",
      });
    }

    /* ===============================
       GENERATE SECURE TOKEN
    =============================== */

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set token and expiration (15 minutes)
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);

    await user.save({ validateBeforeSave: false });

    /* ===============================
       CREATE RESET URL
    =============================== */

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    /* ===============================
       DEVELOPMENT MODE: LOG TO CONSOLE
    =============================== */

    if (process.env.NODE_ENV !== "production") {
      console.log("🔐 PASSWORD RESET REQUEST");
      console.log("📧 Email:", email);
      console.log("🔗 Reset URL:", resetUrl);
      console.log("⏰ Expires in 15 minutes");
      console.log("═".repeat(50));

      return res.status(200).json({
        success: true,
        message: "Password reset link generated. Check server console for the reset URL.",
        resetUrl: resetUrl, // Include in development response
      });
    }

    /* ===============================
       PRODUCTION MODE: SEND EMAIL
    =============================== */

    try {
      // Check if email credentials are configured
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error("Email credentials not configured");
        return res.status(500).json({
          success: false,
          message: "Email service not configured. Please contact support.",
        });
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: `"${process.env.APP_NAME || 'ZenvoraHRM'}" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Password Reset Request - ZenvoraHRM",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">🔐 Password Reset</h1>
            </div>

            <div style="background: white; border: 1px solid #ddd; border-radius: 0 0 10px 10px; padding: 30px;">
              <h2 style="color: #333; margin-top: 0;">Reset Your Password</h2>

              <p>Hello ${user.name || 'User'},</p>

              <p>You have requested to reset your password for your ZenvoraHRM account. Click the button below to create a new password:</p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
              </div>

              <p style="color: #666; font-size: 14px;">
                <strong>Important:</strong> This link will expire in 15 minutes for security reasons.
              </p>

              <p style="color: #666; font-size: 14px;">
                If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
              </p>

              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

              <p style="color: #999; font-size: 12px; text-align: center;">
                If the button doesn't work, copy and paste this URL into your browser:<br>
                <span style="word-break: break-all; color: #667eea;">${resetUrl}</span>
              </p>

              <p style="color: #999; font-size: 12px; text-align: center;">
                This email was sent by ZenvoraHRM. Please do not reply to this email.
              </p>
            </div>
          </body>
          </html>
        `,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({
        success: true,
        message: "Password reset link has been sent to your email address.",
      });

    } catch (emailError: any) {
      console.error("Email sending failed:", emailError);

      // Clean up the token if email fails
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      res.status(500).json({
        success: false,
        message: "Failed to send reset email. Please try again later.",
      });
    }

  } catch (error: any) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
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
    const { password } = req.body;
    const { token } = req.params;

    // Validate input
    if (!password || typeof password !== 'string') {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    if (!token || typeof token !== 'string') {
      return res.status(400).json({
        success: false,
        message: "Invalid reset token",
      });
    }

    /* ===============================
       HASH TOKEN AND FIND USER
    =============================== */

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // Check if user has a password (not OAuth user)
    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: "This account uses social login and cannot reset password this way",
      });
    }

    /* ===============================
       UPDATE PASSWORD
    =============================== */

    const hashedPassword = await hashPassword(password);

    // Update user with new password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // Log successful password reset (without sensitive data)
    console.log(`🔐 Password reset successful for user: ${user.email} at ${new Date().toISOString()}`);

    res.status(200).json({
      success: true,
      message: "Password has been reset successfully. You can now log in with your new password.",
    });

  } catch (error: any) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};