import express from "express";

const app = express();

// Middleware
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// CORS Configuration


// Api Routes

// Checking Server Status
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is up and running!"
    })
})

export default app;