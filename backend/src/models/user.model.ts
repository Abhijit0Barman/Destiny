import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const userSchema = new mongoose.Schema<UserType>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hashSync(this.password, 10);
  }
  next();
});
/*
 *  this middleware ensures that every time a document of this schema is about to be saved,
 * it checks if the "password" field has been modified.
 * If so, it hashes the password using bcrypt and then allows the save operation to proceed.
 * This is a common practice for securing user passwords by storing only their hashed versions in the database.
 */

export const User = mongoose.model<UserType>("User", userSchema);