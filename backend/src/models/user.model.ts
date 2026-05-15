import mongoose, { Document, Schema } from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  HR = "hr",
  EMPLOYEE = "employee",
  CANDIDATE = "candidate",
}

export enum AuthProvider {
  LOCAL = "local",
  GOOGLE = "google",
  MICROSOFT = "microsoft",
}

export interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber?: string;
  password?: string;
resetPasswordToken?: string;
resetPasswordExpire?: Date;

  role: UserRole;

  googleId?: string;
  microsoftId?: string;

  avatar?: string;

  provider: AuthProvider;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: function () {
        return this.provider === AuthProvider.LOCAL;
      },
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CANDIDATE,
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    microsoftId: {
      type: String,
      unique: true,
      sparse: true,
    },

    avatar: {
      type: String,
    },

    provider: {
      type: String,
      enum: Object.values(AuthProvider),
      default: AuthProvider.LOCAL,
    },
    
    
    
resetPasswordToken: {
  type: String,
},

resetPasswordExpire: {
  type: Date,
},
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;