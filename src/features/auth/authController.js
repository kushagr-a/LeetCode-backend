import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { db } from "../../db/db.js"
import { UserRole } from '@prisma/client';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existingUser = await db.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"
            })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: UserRole.USER
            }
        });

        // Generate JWT Token
        const token = jwt.sign(
            {
                id: newUser.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '2h'
            }
        )

        // set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 2 * 60 * 60 * 1000 // 2 hours
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                Image: newUser?.image
            },
            accessToken: token
        })
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user by email
        const user = await db.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found with this email"
            });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '2h'
            }
        )

        // set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 2 * 60 * 60 * 1000 // 2 hours
        });

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                Image: user?.image
            },
            accessToken: token
        })
    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        })
        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    } catch (error) {
        console.error("Error in logout:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const checkAuth = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "User is authenticated",
        user: req.user
    });
} 