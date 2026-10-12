import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    displayName: {
      type: String,
      trim: true,
      maxlength: 80,
    },
    passwordHash: {
      type: String,
      select: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
      select: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    sessionVersion: {
      type: Number,
      default: 0,
      select: false,
    },
    emailVerificationTokenHash: {
      type: String,
      select: false,
    },
    emailVerificationTokenExpiresAt: Date,
    passwordResetTokenHash: {
      type: String,
      select: false,
    },
    passwordResetTokenExpiresAt: Date,
    avatarUrl: String,
    avatarPublicId: String,
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
