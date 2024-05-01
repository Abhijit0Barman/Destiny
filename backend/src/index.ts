import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";

mongoose.connect(process.env.MONGODB_URL as string);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/test", (req: Request, res: Response) => {
  res.json({ message: `Express Server Running http://localhost:${process.env.PORT}` });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
