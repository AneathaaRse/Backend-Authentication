import User from "../Models/userModel.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";

dotenv.config();

//regsiter

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: passwordHash });
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    await newUser.save();
    res
      .status(200)
      .json({ message: "User registered Successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.token = token;
    await user.save();
    res
      .status(200)
      .json({ message: "User Logged In Successfully", token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Forgot password

export const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
  
      console.log("Email from request:", email); // Log the email from the request
  
      // Use a case-insensitive regex to find the user by email
      const user = await User.findOne({ email: { $regex: new RegExp(email, "i") } });
  
      if (!user) {
        console.log(`User with email ${email} not found.`); // Debug log
        return res.status(404).json({ message: "User Not Found" });
      }
  
      console.log("User found:", user); // Log the user if found
  
      // Generate random string and save it
      const generateRandomString = () => crypto.randomBytes(16).toString("hex");
      const randomString = generateRandomString();
  
      user.randomString = randomString;
      await user.save();
  
      // Email transport and sending logic here...
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.PASS_MAIL,
          pass: process.env.PASS_KEY,
        },
      });
  
      const mailOptions = {
        from: process.env.PASS_MAIL,
        to: user.email,
        subject: "Password Reset Link",
        text: `Please reset your password here: https://frontend-user-authentication.vercel.app/reset-password/${user._id}/${randomString}`,
      };
  
      await transporter.sendMail(mailOptions);
  
      return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error in forgotPassword:", error); // Log the error
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  
  
  

//Reset password

export const resetPassword = async (req, res) => {
  try {
    const { id, randomString } = req.params;
    const { password } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.randomString !== randomString) {
      return res.status(400).json({ message: "Invalid or expired reset link" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    user.password = passwordHash;
    user.randomString = null;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};