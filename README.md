
2:56:58

# Destiny
 # Express TypeScript Starter Project with MongoDB, User Authentication, and Testing

## Introduction
This is a starter project for building a RESTful API using Express, TypeScript, MongoDB. It includes user authentication and a simple test route.

## Prerequisites
- Node.js and npm installed
- MongoDB installed and running

## Installation
1. Clone the repository:
```
git clone https://github.com/your-username/express-typescript-starter.git
```
2. Install dependencies:
```
npm install
```

## Configuration
1. Create a `.env` file in the root directory and add the following environment variables:
```
MONGODB_URL=mongodb+srv://abhijitbarman96:barman@destiny-cluster.tzx4lyn.mongodb.net/DestinyDB?retryWrites=true&w=majority&appName=Destiny-Cluster

PORT=7000

JWT_SECRET_KEY=https://randomkeygen.com/

NODE_ENV=
```
2. Replace `your-database-name` with the name of the MongoDB database you want to use.

## Running the Server
1. Start MongoDB.
2. Run the following command to start the server:
```
npm start
```
The server will listen on port 7000 by default.

## Routes
The project includes the following routes:
- `/api/auth`: Authentication routes for user registration and login.
- `/api/users`: User management routes for CRUD operations.
- `/test`: A simple test route to verify that the server is running.

## Testing
The project includes a simple test for the `/test` route. To run the tests, run the following command:
```
npm test
```

## Conclusion
This starter project provides a solid foundation for building a RESTful API with Express, TypeScript, MongoDB, and Jest for testing. It includes user authentication and a simple test route, and can be easily customized to meet your specific requirements.


 ## User Schema for Mongoose

This is a user schema for Mongoose, a popular object modeling tool for MongoDB. It defines the structure and properties of a user document in a MongoDB database.

### Prerequisites

To use this schema, you will need to have:

- Node.js and npm installed
- MongoDB installed and running
- Mongoose installed (```npm install mongoose```)
- Bcryptjs installed (```npm install bcryptjs```)

### Usage

To use this schema, you can import it into your Node.js script and create a model based on it:

```typescript
import mongoose from "mongoose";
import { UserType } from "./user-schema";

const userSchema = new mongoose.Schema<UserType>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { versionKey: false }
);

const User = mongoose.model<UserType>("User", userSchema);
```

### Schema Details

The schema defines the following properties for a user document:

- `_id`: This is the unique identifier for each user document. It is automatically generated by MongoDB and should not be set manually.
- `email`: This is the email address of the user. It is required and must be unique.
- `password`: This is the password of the user. It is required and is hashed using bcryptjs before being stored in the database.
- `firstName`: This is the first name of the user. It is required.
- `lastName`: This is the last name of the user. It is required.

### Pre-save Middleware

The schema also defines a pre-save middleware function. This function is executed before a user document is saved to the database. It checks if the `password` field has been modified. If so, it hashes the password using bcryptjs and then allows the save operation to proceed. This is a common practice for securing user passwords by storing only their hashed versions in the database.

### Conclusion

This user schema provides a secure and flexible way to store user data in a MongoDB database. It can be used in a variety of applications, such as authentication systems, user management systems, and e-commerce platforms.



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

 # User Authentication with JWT and Cookies

This Node.js script provides a secure user authentication mechanism using JSON Web Tokens (JWT) and HTTP cookies. It's designed to be part of a larger Express-based application.

## Functionality Overview

The script handles user registration and sets a secure HTTP cookie named "auth_token" upon successful authentication.


List of Dependencies & devDependencies:
1.  npm i cookie-parser     npm i --save-dev @types/cookie-parser
2. 