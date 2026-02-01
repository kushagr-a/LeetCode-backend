import { Router } from "express";

const authRoutes = Router();

import {
    registerUser,
    loginUser,
    logoutUser,
    checkAuth
} from "../auth/authController.js"

authRoutes.route("/register").post(registerUser)

authRoutes.route("/login").post(loginUser)

authRoutes.route("/logout").post(logoutUser)

authRoutes.route("/check").get(checkAuth)

export default authRoutes;