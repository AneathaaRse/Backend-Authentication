## Password Reset System

This project implements a complete Password Reset Flow using Node.js, Express.js, MongoDB, and React. It provides a seamless experience for users to reset their passwords securely and efficiently.

# Features

User Registration and Login

Forgot Password functionality with email verification

Secure Password Reset Flow

Frontend built with React and styled using Bootstrap

Project Workflow

1. Forget Password Page

Users enter their registered email address on the Forget Password page.

2. Check User Existence

Backend verifies if the email exists in the database.

If the user is not found: Returns an error message.

If the user exists: A random string is generated.

3. Send Reset Link

The random string is stored in the database and included in a reset link sent to the user's email.

4. User Clicks Link

The reset link redirects the user to the Password Reset page on the frontend.

5. Validate Reset Token

Backend verifies the random string from the reset link.

If valid: Displays a form to enter a new password.

If invalid or expired: Displays an error message.

6. Password Reset

User submits the new password.

Backend updates the password securely.

Success: User can now log in with their new password.

Technical Specifications

Frontend

Framework: React.js

Styling: Bootstrap

Features:

User-friendly forms for Forget Password and Reset Password

Backend

Framework: Node.js and Express.js

Database: MongoDB with Mongoose

Libraries Used:

bcrypt for password hashing

jsonwebtoken for token-based authentication

nodemailer for sending emails

crypto for generating secure random strings

Prerequisites

Ensure you have the following installed:

Node.js (v14+)

MongoDB (local or cloud instance)

React.js

Postman or cURL for API testing
