import express from 'express';
import {
    createCulture,
    getAllCultures,
    getCultureById,
    updateCulture,
    deleteCulture
} from '../controllers/CulturesController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', createCulture); // Create a new culture
router.get('/', getAllCultures); // Get all cultures
router.get('/:id', getCultureById); // Get a single culture by ID
router.put('/:id', updateCulture); // Update a culture by ID
router.delete('/:id', deleteCulture); // Delete a culture by ID

export default router;