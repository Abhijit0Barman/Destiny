import express, { Request, Response } from "express";
import { check, ValidationChain, validationResult } from "express-validator";
import { User } from "../models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

const strongPasswordValidator: ValidationChain = check("password")
  .isStrongPassword({
    minLength: 4, // Minimum length of the password
    minLowercase: 1, // Minimum lowercase characters
    minUppercase: 1, // Minimum uppercase characters
    minNumbers: 1, // Minimum numbers
    minSymbols: 1, // Minimum symbols
  }).withMessage("Password must be strong");

// {
//   "email":"avi@gmail.com",
//   "password":"aA@1"
// }

router.post("/login", [
  check("email", "Email is required").isEmail(),
  // check("password", "Password with 6 or more charecters is required").isLength({ min: 6 }),
  strongPasswordValidator,
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Login logic here
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    // compare password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: "1d", });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ userId: user._id });//in the frontend they can use this userId to get the user data cause they cant access the token 
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
}
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId })
})

export default router;

/*
When setting a cookie from the frontend using JavaScript with `res.cookie()`, 
the options you specify determine how the cookie can be accessed:

1. **httpOnly**: When set to `true`, this option restricts the cookie from being accessed via JavaScript. 
It means that the cookie is only accessible by the server and cannot be accessed or modified by client-side scripts. 
This helps prevent cross-site scripting (XSS) attacks.

2. **secure**: When set to `true`, the cookie will only be sent over HTTPS connections. 
This ensures that the cookie data is encrypted during transmission between the client and the server, 
adding an extra layer of security. It's typically recommended to set this option to `true` in production 
environments to prevent sensitive cookie data from being intercepted.

3. **maxAge**: This option specifies the maximum age of the cookie in milliseconds. 
In your case, it's set to expire after 24 hours (`24 * 60 * 60 * 1000` milliseconds). 
After this duration, the cookie will be automatically removed by the browser.

Considering these options:
- The cookie will be accessible by the server-side code because it's set via `res.cookie()`.
- It won't be accessible by client-side JavaScript due to the `httpOnly` flag being set to `true`.
- It will only be sent over HTTPS connections (`secure` flag), ensuring that it's transmitted securely.
- It will expire after 24 hours (`maxAge`), after which the browser will automatically remove it.

So, in summary, 
the cookie can be accessed by the server-side code, 
but it cannot be accessed or modified by client-side JavaScript. 
It's transmitted securely over HTTPS and has a defined expiration time.
*/