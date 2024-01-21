# Destiny

 # User Login API with Express and JWT

This is a simple user login API built with Express and JWT. It allows users to log in to the system by providing their email and password. If the credentials are valid, a JWT token is generated and sent back to the client.

## Prerequisites

- Node.js and npm installed
- A MongoDB database
- A JWT secret key (stored in a `.env` file)

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/user-login-api-express-jwt.git
cd user-login-api-express-jwt
npm install
```

## Configuration

Copy the `.env.example` file to `.env` and add your database connection string and JWT secret key:

```bash
cp .env.example .env
```

## Usage

Start the server:

```bash
npm start
```

The API will be available at `http://localhost:3000/api/auth/login`.

## Code Walkthrough

### 1. Import the necessary modules

```typescript
import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { User } from "../models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
```

- `express`: The Express framework for building web applications.
- `express-validator`: A library for validating user input.
- `User`: The User model from the database.
- `bcryptjs`: A library for hashing passwords.
- `jwt`: A library for generating JSON Web Tokens (JWTs).

### 2. Define the login route

```typescript
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
    // ...
  }
);
```

- The `"/login"` route is defined using the `router.post()` method.
- The route is protected with the `express-validator` middleware, which validates the user input.
- The `check()` method is used to define
  - the field to be validated (`"email"`)