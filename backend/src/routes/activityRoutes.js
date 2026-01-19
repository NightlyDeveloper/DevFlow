import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getMyStats, logActivity } from "../controllers/activityController.js";

const router = express.Router();

router.get('/me', authMiddleware, getMyStats);
router.post('/', authMiddleware, logActivity);

export default router;