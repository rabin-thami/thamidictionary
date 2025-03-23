import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  isVerified: boolean;
  userInfo: string;
  avatar: string;
  createdAt: Date;
  verificationToken: string;
  verificationTokenExpire: Date;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please enter your full name"],
    trim: true,
    regex: /^[A-Za-z]+ [A-Za-z]+$/,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    trim: true,
    lowercase: true,
    regex:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    trim: true,
    minLength: 6,
    maxLength: 64,
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone number"],
    trim: true,
    regex: /^[0-9]{10}$/,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  userInfo: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
    default: "default.jpg",
  },

  verificationToken: {
    type: String,
  },
  verificationTokenExpire: {
    type: Date,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);

export default UserModel;
