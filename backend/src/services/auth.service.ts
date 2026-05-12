import User, { AuthProvider, UserRole } from "../models/user.model";
import {
  hashPassword,
  comparePassword,
} from "../utils/hashPassword";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: UserRole
) => {
  // Check existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await User.create({
    name,
    email,
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