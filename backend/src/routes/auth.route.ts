import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "Password with 6 or more charecters is required"
    ).isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Login logic here
    const { email, password } = req.body;
    try {
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Server error" });
      return;
    }
  }
);
