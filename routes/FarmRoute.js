import express from 'express';
import { createFarm, getAllFarms, getFarmById, updateFarm, deleteFarm } from '../controllers/FarmController.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/', upload.array('pictures', 10), createFarm); // Allow up to 10 pictures
router.get('/', getAllFarms);
router.get('/:id', getFarmById);
router.put('/:id', upload.array('pictures', 10), updateFarm); // Allow updating pictures
router.delete('/:id', deleteFarm);

export default router;