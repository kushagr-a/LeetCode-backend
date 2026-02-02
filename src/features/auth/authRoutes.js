import { Router } from "express";

const authRoutes = Router();

import {
    registerUser,
    loginUser,
    logoutUser,
    checkAuth
} from "../auth/authController.js"

import { verifyJwt } from "../auth/authMiddleware.js";

authRoutes.route("/register").post(registerUser)

authRoutes.route("/login").post(loginUser)

authRoutes.route("/logout").post(logoutUser)

authRoutes.route("/check").get(verifyJwt, checkAuth)

export default authRoutes;