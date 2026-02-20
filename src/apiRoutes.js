import { Router } from 'express';

// Here write all import statements for different route files
import authRoutes from './features/auth/authRoutes.js';
import problemRoutes from './features/problems/problemsRoutes.js';

const apiRoutes = Router();

// Here use different route files with ApiRoutes
apiRoutes.use("/auth", authRoutes);

apiRoutes.use("/problems", problemRoutes);

export default apiRoutes; 