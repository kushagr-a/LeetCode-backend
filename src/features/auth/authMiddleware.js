import jwt from "jsonwebtoken";
import { db } from "../../db/db.js";

export const verifyJwt = async (req, res, next) => {
    try {
        // Token from cookie OR Authorization header
        const token = req.cookies?.token ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (typeof decoded !== "object" || !decoded.id) {
            return res.status(401).json({
                success: false,
                message: "Invalid token payload"
            });
        }

        const user = await db.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true
            }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists"
            });
        }


        // Attach user to request
        req.user = user;
        next();

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: "Token expired",
            });
        }

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Authentication failed",
        });
    }
}