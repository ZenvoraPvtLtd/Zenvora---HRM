import User, { AuthProvider, UserRole } from "../models/user.model";
import {
  hashPassword,
  comparePassword,
} from "../utils/hashPassword";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: UserRole,
  phoneNumber?: string
) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    phoneNumber,
    password: hashedPassword,
    role,
    provider: AuthProvider.LOCAL,
  });

  return user;
};

export const loginUser = async (
  email: string,
  password: string
) => {
  // Find user
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // IMPORTANT:
  // OAuth users may not have password
  if (!user.password) {
    throw new Error(
      "This account uses Google/Microsoft login"
    );
  }

  // Compare password
  const isMatch = await comparePassword(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};