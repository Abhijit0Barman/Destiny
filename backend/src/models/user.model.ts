import mongoose from "mongoose";

export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const userSchema = new mongoose.Schema<UserType>(
  {
    _id: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
  },
  { versionKey: false }
);

export const User = mongoose.model<UserType>("User", userSchema);

// export const User
