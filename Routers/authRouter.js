import express from "express";
import { loginUser, registerUser,forgotPassword, resetPassword } from "../Controllers/userController.js";





const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:id/:randomString", resetPassword)

export default router;
