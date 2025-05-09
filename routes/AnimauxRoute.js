import express from 'express';
import {
    createAnimal,
    getAllAnimals,
    getAnimalById,
    updateAnimal,
    deleteAnimal
} from '../controllers/AnimauxController.js';

const router = express.Router();

router.post('/', createAnimal); // Create a new animal
router.get('/', getAllAnimals); // Get all animals
router.get('/:id', getAnimalById); // Get a single animal by ID
router.put('/:id', updateAnimal); // Update an animal by ID
router.delete('/:id', deleteAnimal); // Delete an animal by ID

export default router;