#  Module 4 Assignment: Authentication & Authorization – LMS Backend

##  Objective

Build a secure backend for a Learning Management System (LMS) using:

-  JWT for authentication  
-  Role-Based Access Control (RBAC)  
-  Bcrypt for password hashing  



##  Tech Stack

- **Node.js**  
- **Express.js**  
- **TypeScript**  
- **MongoDB + Mongoose**  
- **JWT (jsonwebtoken)**  
- **Bcrypt (bcryptjs)**  
- **dotenv**

---

##  Folder Structure

```
Module4_Assignment/
├── src/
│   ├── models/
│   │   └── user_model.ts
│   ├── middleware/
│   │   └── authMiddleware.ts
│   ├── routes/
│   │   └── userRoutes.ts
│   └── server.ts
├── .env
├── package.jsonha
├── tsconfig.json
├── README.md
```



##  .env File

Create a `.env` file in the root with the following:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BCRYPT_SALT_ROUNDS=10
```



##  Installation & Running

```
# 1. Clone the repository
cd Module4_Assignment

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```



##  API Endpoints

###  POST `/api/register`

Registers a new user.

#### Body:
```json
{
  "name": "Poojitha",
  "email": "poojitha123@gmail.com",
  "password": "12345676",
  "role": "admin"
}
```



###  POST `/api/login`

Authenticates a user and returns a JWT token.

#### Body:
```json
{
  "email": "pooitha@gmail.com",
  "password": "qwerty123"
}
```

####  Response:
```json
{
  "token": "your jwt token"
}
```



###  GET `/api/users`

Returns all registered users (accessible only by admin).

#### Headers:
```
Authorization: Bearer <your-jwt-token>
```



##  Testing with Postman

1. Register users using `/api/register`  
2. Login to get the JWT from `/api/login`  
3. Access `/api/users` using the JWT in the Authorization header  


##  Linting & TypeScript

```
# Compile TypeScript
npm run build

# Run compiled app
npm start
```

