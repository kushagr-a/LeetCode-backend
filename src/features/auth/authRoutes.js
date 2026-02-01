import { Router } from "express";

const authRoutes = Router();

authRoutes.route("/check").get((req, res) => {
    res.status(200).json({
        success: true,
        message: "Auth route is working!"
    });
});

authRoutes.route("/register").post()

authRoutes.route("/login").post()

authRoutes.route("/logout").post()

authRoutes.route("/check").get()

export default authRoutes;