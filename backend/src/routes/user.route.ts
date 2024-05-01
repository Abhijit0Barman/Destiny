import express, { Request, Response, Router } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = Router();

router.post("/register", [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
  check("firstName", "Please enter a first name").isString(),
  check("lastName", "Please enter a last name").isString(),
], async (req: Request, res: Response) => {
  // Check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email, });
    if (user) {
      return res.status(400).json({ msg: `User already exists` });
    }
    user = new User(req.body);
    //there is a middleware which is cheacking the password before saving the user
    await user.save();

    //creating token with userID
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY as string, { expiresIn: "1d" });  //"1h" || "2d"

    //sending token in cookie
    res.cookie("auth_token", token, {
      httpOnly: true, //This restricts access to the cookie to only be through HTTP requests.if the Node.js environment is in production
      secure: process.env.NODE_ENV === "production", //in production only it will be secured
      maxAge: 1000 * 60 * 60 * 24, //864,00,000 Mili second == 1 day     `COOKIE & TOKEN has same expiry time`
    });
    //We are not going to send anything in the body of the response.
    //We are just going to send a message in the body of the response.
    //Because we are sending a HTTP cookie And this gets set automatically In the browser for us
    //It means we don't have to write any code on the frontend to handle this which is nice
    return res.status(200).json({ msg: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Something went wrong" });
  }
}
);

export default router;

/**
 * This code appears to be a part of a server-side script, likely in a Node.js application using Express. 
 * It seems to be handling the authentication of a user and setting a secure HTTP cookie named "auth_token" upon successful authentication.
 * Let's break down the code:
            res.cookie("auth_token", token, {
This line sets an HTTP cookie named "auth_token" in the response object (res). 
The cookie is being set with the following options:
    httpOnly: true: This option restricts access to the cookie to only be through HTTP requests. 
        It helps mitigate certain types of cross-site scripting (XSS) attacks by preventing client-side scripts from accessing the cookie.
    secure: process.env.NODE_ENV === "production": The secure option is set to true only if the Node.js environment is in production (process.env.NODE_ENV === "production"). 
        When secure is true, the cookie will only be sent over HTTPS connections, enhancing security.
    maxAge: 1000 * 60 * 60 * 24: This option sets the maximum age of the cookie in milliseconds. 
        In this case, it's set to 24 hours.
});
return res.status(200);
Finally, the code returns a response with a status code of 200 (OK). This indicates that the authentication process was successful.
 */
