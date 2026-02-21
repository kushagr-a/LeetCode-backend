import { db } from "../../db/db.js";

export const createProblem = async (req, res) => {
    try {
        const {
            title,
            description,
            difficulty,
            tags,
            examples,
            constraints,
            testCases,
            codeSnippets,
            referenceSolutions,
            hints,
            editorial
        } = req.body

        for (const [language, solutionCOde0] of Object.entries(referenceSolutions)) {
            if (!solutionCOde0) {
                return res.status(400).json({
                    success: false,
                    message: "Solution code is required",
                })
            }
        }
    } catch (error) {
        console.error("Error in creating problems", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error",

        })
    }
}

export const getAllProblems = async (req, res) => {
    try {

    } catch (error) {
        console.error("Error in getting all problems", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error",

        })
    }
}

export const getProblemById = async (req, res) => {
    try {

    } catch (error) {
        console.error("Error in getting problem by ID", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error",

        })
    }
}


export const updateProblem = async (req, res) => {
    try {

    } catch (error) {
        console.error("Error in updating problem", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error",

        })
    }
}

export const deleteProblem = async (req, res) => {
    try {

    } catch (error) {
        console.error("Error in deleting problem", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error",

        })
    }
}
