# Password Reset System
This project implements a complete Password Reset Flow using Node.js, Express.js, MongoDB, and React. It provides a seamless and secure user experience for resetting passwords.

## Features
. User Registration and Login functionality.
. Forgot Password feature with email verification.
. Secure Password Reset Flow with token validation.
. Frontend built using React and styled with Bootstrap.

# Project Workflow

## 1. Forget Password Page

   Users enter their registered email address on the Forget Password page.
   
## 2. Check User Existence
. Backend verifies if the email exists in the database:
. If user is not found: Returns an error message.
. If user exists: A secure random string is generated.

## 3. Send Reset Link
. The random string is stored in the database.
. A reset link containing the string is emailed to the user.

## 4. User Clicks Link
 The reset link redirects the user to the Password Reset Page on the frontend.
 
## 5. Validate Reset Token
. Backend verifies the random string from the reset link:
. If valid: Displays a form to enter a new password.
. If invalid/expired: Displays an error message.

## 6. Password Reset
. User submits the new password.
. Backend securely updates the password in the database.
. Success: User can now log in with their new password

# Technical Specifications
## Frontend
. Framework: React.js
. Styling: Bootstrap

Features:
. User-friendly forms for Forget Password and Reset Password flows.
## Backend
. Framework: Node.js with Express.js
. Database: MongoDB with Mongoose
## Libraries Used:
. bcrypt: Password hashing.
. jsonwebtoken: Token-based authentication.
. nodemailer: Sending emails.
. crypto: Generating secure random strings.

# Prerequisites
Ensure the following are installed:

. Node.js (v14+)
. MongoDB (local or cloud instance)
. React.js (for frontend development)
. Postman or cURL (for API testing)

# API Endpoints
1. User Registration
 => Endpoint: POST /api/auth/register
 => Description: Registers a new user.

2. User Login
 => Endpoint: POST /api/auth/login
 => Description: Logs in an existing user.

3. Forgot Password
 => Endpoint: POST /api/auth/forgot-password
 => Description: Sends a password reset link to the user's email.

4. Reset Password
 => Endpoint: POST /api/auth/reset-password/:id/:randomString
 => Description: Updates the user's password.

# Postman Collection 
https://documenter.getpostman.com/view/39168679/2sAYJ99xuM
