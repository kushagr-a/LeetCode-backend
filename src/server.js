// Loading environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

import app from "../src/app.js";
import { db } from "../src/db/db.js";
 
// Connecting to Db also here code can be added

const PORT = process.env.PORT || 3030;

const startServer = async () => {
    try {
        const server = app.listen(PORT, () => {
            console.log(`Your server is running on http://localhost:${PORT}`);
        });

        // connect to the database
        await db.$connect();
        console.log("PostgreSQL connected via Prisma.");

        // Graceful Shutdown Handling
        const shutdown = async () => {
            console.log("Shutting down...");
            await db.$disconnect();
            server.close(() => {
                console.log("Server closed.");
                process.exit(0);
            });
        };

        process.on("SIGINT", shutdown);  // Ctrl + C
        process.on("SIGTERM", shutdown); // kill / Docker etc.
    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
};

startServer();
