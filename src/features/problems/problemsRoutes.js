import { Router } from "express";

import { verifyJwt, checkAdmin } from '../auth/authMiddleware.js'

import { createProblem } from "./problemController.js";

const problemRoter = Router();

problemRoter.use(verifyJwt)

problemRoter.route("/createProblem").post(checkAdmin, createProblem)

// problemRoter.route("/")

// problemRoter.route("/")

// problemRoter.route("/")

export default problemRoter;