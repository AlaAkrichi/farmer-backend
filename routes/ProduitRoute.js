import express from 'express';
import { createProduit, deleteProduit, getAllProduits, getProduitById, updateProduit } from '../controllers/ProduitsController';


const router = express.Router();

router.post('/', createProduit); // Create a new animal
router.get('/', getAllProduits); // Get all animals
router.get('/:id', getProduitById); // Get a single animal by ID
router.put('/:id', updateProduit); // Update an animal by ID
router.delete('/:id', deleteProduit); // Delete an animal by ID

export default router;