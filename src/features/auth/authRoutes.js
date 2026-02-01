import { Router } from "express";

const authRoutes = Router();

authRoutes.route("/check").get((req, res) => {
    res.status(200).json({
        success: true,
        message: "Auth route is working!"
    });
});

export default authRoutes;