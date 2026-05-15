import { Router } from "express";
import passport from "passport";

import { oauthSuccess } from "../controllers/oauth.controller";

const router = Router();

const requireOAuthConfig = (
  provider: "google" | "microsoft"
) => {
  return (_req: any, res: any, next: any) => {
    const prefix = provider.toUpperCase();
    const isConfigured =
      process.env[`${prefix}_CLIENT_ID`] &&
      process.env[`${prefix}_CLIENT_SECRET`] &&
      process.env[`${prefix}_CALLBACK_URL`];

    if (!isConfigured) {
      return res.status(503).json({
        success: false,
        message: `${provider} OAuth is not configured on this server`,
      });
    }

    next();
  };
};

/* ======================================================
   GOOGLE AUTH
====================================================== */

router.get(
  "/google",
  requireOAuthConfig("google"),
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  requireOAuthConfig("google"),
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  oauthSuccess
);

/* ======================================================
   MICROSOFT AUTH
====================================================== */

router.get(
  "/microsoft",
  requireOAuthConfig("microsoft"),
  passport.authenticate("microsoft", {
    session: false,
  })
);

router.get(
  "/microsoft/callback",
  requireOAuthConfig("microsoft"),
  passport.authenticate("microsoft", {
    failureRedirect: "/login",
    session: false,
  }),
  oauthSuccess
);

export default router;
