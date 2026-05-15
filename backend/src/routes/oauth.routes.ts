import { Router } from "express";
import passport from "passport";

import { oauthSuccess } from "../controllers/oauth.controller";

const router = Router();

/* ======================================================
   GOOGLE AUTH
====================================================== */

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
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
  passport.authenticate("microsoft", {
    session: false,
  })
);

router.get(
  "/microsoft/callback",
  passport.authenticate("microsoft", {
    failureRedirect: "/login",
    session: false,
  }),
  oauthSuccess
);

export default router;