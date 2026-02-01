import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { db } from "../../db/db.js"
import { UserRole } from '@prisma/client';

export const registerUser = async (req, res) => { }

export const loginUser = async (req, res) => { };

export const logoutUser = async (req, res) => { };

export const checkAuth = async (req, res) => {}