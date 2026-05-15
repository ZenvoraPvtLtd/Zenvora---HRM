import User, {
  AuthProvider,
  UserRole,
} from "../models/user.model";

interface OAuthUserData {
  name: string;
  email: string;
  avatar?: string;
  googleId?: string;
  microsoftId?: string;
  provider: AuthProvider;
}

export const findOrCreateOAuthUser = async (
  data: OAuthUserData
) => {
  const {
    name,
    email,
    avatar,
    googleId,
    microsoftId,
    provider,
  } = data;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      avatar,
      googleId,
      microsoftId,

      provider,

      role: UserRole.CANDIDATE,
    });
  }

  return user;
};
