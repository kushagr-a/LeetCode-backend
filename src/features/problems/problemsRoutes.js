import { Router } from "express";

import { verifyJwt, checkAdmin } from '../auth/authMiddleware.js'

import {
    createProblem,
    getAllProblems,
    getProblemById,
    updateProblem,
    deleteProblem
} from "./problemController.js";

const problemRoter = Router();

problemRoter.use(verifyJwt)

problemRoter.route("/createProblem").post(checkAdmin, createProblem)

problemRoter.route("/getAllProblems").get(getAllProblems)

problemRoter.route("/getProblemById").get(getProblemById)

problemRoter.route("/updateProblem").put(checkAdmin, updateProblem)

problemRoter.route("/deleteProblem").delete(checkAdmin, deleteProblem)

export default problemRoter;