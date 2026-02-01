import { Router } from 'express';

// Here write all import statements for different route files
import authRoutes from './features/auth/authRoutes.js';

const apiRoutes = Router();

// Here use different route files with ApiRoutes
apiRoutes.use("/auth", authRoutes);

export default apiRoutes; 