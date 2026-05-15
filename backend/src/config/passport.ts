import passport from "passport";

import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";

import { Strategy as MicrosoftStrategy } from "passport-microsoft";

import User, {
  AuthProvider,
  UserRole,
} from "../models/user.model";

/* ======================================================
   GOOGLE AUTH
====================================================== */

const hasGoogleOAuthConfig =
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET &&
  process.env.GOOGLE_CALLBACK_URL;

if (hasGoogleOAuthConfig) {
  const googleClientId = process.env.GOOGLE_CLIENT_ID as string;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
  const googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL as string;

  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL:
          googleCallbackUrl,
      },

      async (
        _accessToken: string,
        _refreshToken: string,
        profile: any,
        done: VerifyCallback
      ) => {
        try {
          const email =
            profile.emails?.[0]?.value;

          if (!email) {
            return done(
              new Error("Google email not found"),
              undefined
            );
          }

          let user = await User.findOne({ email });

          if (!user) {
            user = await User.create({
              name: profile.displayName,
              email,
              googleId: profile.id,
              avatar: profile.photos?.[0]?.value,
              provider: AuthProvider.GOOGLE,
              role: UserRole.CANDIDATE,
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error as Error);
        }
      }
    )
  );
}

/* ======================================================
   MICROSOFT AUTH
====================================================== */

const hasMicrosoftOAuthConfig =
  process.env.MICROSOFT_CLIENT_ID &&
  process.env.MICROSOFT_CLIENT_SECRET &&
  process.env.MICROSOFT_CALLBACK_URL;

if (hasMicrosoftOAuthConfig) {
  const microsoftClientId = process.env.MICROSOFT_CLIENT_ID as string;
  const microsoftClientSecret = process.env.MICROSOFT_CLIENT_SECRET as string;
  const microsoftCallbackUrl = process.env.MICROSOFT_CALLBACK_URL as string;

  passport.use(
    new MicrosoftStrategy(
      {
        clientID: microsoftClientId,
        clientSecret: microsoftClientSecret,
        callbackURL:
          microsoftCallbackUrl,
        scope: ["user.read"],
        tenant:
          process.env.MICROSOFT_TENANT_ID || "common",
      },

      async (
        _accessToken: string,
        _refreshToken: string,
        profile: any,
        done: Function
      ) => {
        try {
          const email =
            profile?._json?.preferred_username;

          if (!email) {
            return done(
              new Error(
                "Microsoft email not found"
              ),
              undefined
            );
          }

          let user = await User.findOne({ email });

          if (!user) {
            user = await User.create({
              name: profile.displayName,
              email,
              microsoftId: profile.id,
              provider: AuthProvider.MICROSOFT,
              role: UserRole.CANDIDATE,
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}

export default passport;
