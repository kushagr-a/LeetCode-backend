import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import apiRoutes from "./apiRoutes.js";

const app = express();

// Middleware
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));
app.use(cookieParser());
app.use(morgan('dev'));

// CORS Configuration
app.use(
    cors({
        origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);

// Api Routes
app.use("/api", apiRoutes);

// Checking Server Status
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is up and running!"
    })
})

export default app;