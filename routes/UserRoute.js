import express from 'express';
import { updateUserProfile, verifyOldPassword } from '../controllers/UserController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.put('/profile', authMiddleware, updateUserProfile); // Protect the route with authMiddleware
router.post('/verify-password', authMiddleware, verifyOldPassword); // Protect the route with auth

export default router;