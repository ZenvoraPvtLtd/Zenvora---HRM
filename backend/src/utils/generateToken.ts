import jwt, { Secret, SignOptions } from "jsonwebtoken";

export const generateAccessToken = (
  id: string,
  role: string
): string => {
  return jwt.sign(
    { id, role },
    process.env.JWT_ACCESS_SECRET as Secret,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE as SignOptions["expiresIn"],
    }
  );
};

export const generateRefreshToken = (id: string): string => {
  return jwt.sign(
    { id },
    process.env.JWT_REFRESH_SECRET as Secret,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE as SignOptions["expiresIn"],
    }
  );
};